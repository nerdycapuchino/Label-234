const { NodeSSH } = require("node-ssh");

const ssh = new NodeSSH();

async function deploy() {
  const host = process.env.DEPLOY_HOST || "72.61.255.54";
  const username = process.env.DEPLOY_USER || "root";
  const password = process.env.DEPLOY_PASSWORD;
  const privateKey = process.env.DEPLOY_PRIVATE_KEY;
  const appDir = process.env.APP_DIR || "/var/www/234label";

  if (!password && !privateKey) {
    throw new Error("Set DEPLOY_PASSWORD or DEPLOY_PRIVATE_KEY before running this script.");
  }

  await ssh.connect({
    host,
    username,
    password,
    privateKey,
  });

  const result = await ssh.execCommand(`cd ${appDir} && bash deploy.sh`);

  if (result.stdout) {
    console.log(result.stdout);
  }

  if (result.stderr) {
    console.error(result.stderr);
  }

  if (result.code !== 0) {
    process.exit(result.code || 1);
  }
}

deploy().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
