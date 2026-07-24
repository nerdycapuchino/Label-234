// First-time deploy for Label 234 (Postgres + backend-api + all apps).
// Auth comes ONLY from env vars — this script never contains a password.
//   DEPLOY_PASSWORD  (or DEPLOY_PRIVATE_KEY) — server root auth
//   DB_PASS          — password to create for the label234 Postgres user
// Usage:  node deploy_first.js
const { NodeSSH } = require("node-ssh");
const ssh = new NodeSSH();

async function main() {
  const host = process.env.DEPLOY_HOST || "72.61.255.54";
  const username = process.env.DEPLOY_USER || "root";
  const password = process.env.DEPLOY_PASSWORD;
  const privateKey = process.env.DEPLOY_PRIVATE_KEY;
  const appDir = process.env.APP_DIR || "/var/www/234label";
  const dbPass = process.env.DB_PASS;

  if (!password && !privateKey) {
    throw new Error("Set DEPLOY_PASSWORD or DEPLOY_PRIVATE_KEY first.");
  }
  if (!dbPass) {
    throw new Error("Set DB_PASS (new Postgres password to create).");
  }

  await ssh.connect({ host, username, password, privateKey });

  async function run(label, cmd) {
    console.log(`\n=== ${label} ===`);
    const r = await ssh.execCommand(cmd, { cwd: appDir });
    if (r.stdout) console.log(r.stdout);
    if (r.stderr) console.error(r.stderr);
    if (r.code !== 0) throw new Error(`${label} failed (exit ${r.code})`);
  }

  // 0. Recon: show what's already on the box (no changes).
  await run(
    "RECON (read-only)",
    "echo '--- pm2 ---'; pm2 ls 2>/dev/null || echo 'no pm2'; " +
      "echo '--- nginx sites ---'; ls /etc/nginx/sites-enabled 2>/dev/null; " +
      "echo '--- postgres ---'; (command -v psql && psql --version) || echo 'no psql'; " +
      "echo '--- port 3002 ---'; (ss -ltnp | grep ':3002' || echo 'free')"
  );

  // 1. Pull latest code.
  await run("GIT PULL", "git fetch origin main && git reset --hard origin/main");

  // 2. One-time server setup (Postgres + DB + backend-api/.env).
  await run("SERVER SETUP", `DB_PASS='${dbPass}' bash scripts/server-setup.sh`);

  // 3. Full deploy (build, migrate, PM2, nginx).
  await run("DEPLOY", "bash deploy.sh");

  // 4. Seed first admin (idempotent-ish; ignores 'already exists').
  await run(
    "SEED ADMIN",
    "curl -s -X POST http://localhost:3002/api/auth/register " +
      "-H 'Content-Type: application/json' " +
      `-d '{"email":"admin@label234.com","password":"${process.env.ADMIN_PASSWORD || "ChangeMe123!"}","name":"Admin"}' ` +
      "|| true"
  );

  // 5. Smoke test.
  await run(
    "SMOKE TEST",
    "echo '--- health ---'; curl -s http://localhost:3002/health; echo; " +
      "echo '--- products ---'; curl -s http://localhost:3002/api/products; echo; " +
      "echo '--- pm2 ---'; pm2 ls"
  );

  console.log("\n✅ First deploy complete.");
  ssh.dispose();
}

main().catch((e) => {
  console.error("\n❌", e.message);
  process.exit(1);
});
