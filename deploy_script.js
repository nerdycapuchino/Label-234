const { execSync } = require('child_process');
const { NodeSSH } = require('node-ssh');

const ssh = new NodeSSH();

async function deploy() {
  console.log("🚀 [1/3] Committing and pushing local changes to GitHub...");
  try {
    execSync('git add .');
    execSync('git commit -m "fix: force update pm2 ports and ts errors"');
    execSync('git push origin main');
    console.log("✅ Code pushed successfully!");
  } catch (e) {
    console.log("⚠️ Note: Code might already be pushed or there was a git error. Continuing to server...");
  }

  console.log("🚀 [2/3] Connecting to the live server (72.61.255.54)...");
  try {
    await ssh.connect({
      host: '72.61.255.54',
      username: 'root',
      password: 'divineGG21@@'
    });
    console.log("✅ Connected to server!");
  } catch (err) {
    console.error("❌ Failed to connect to server:", err.message);
    process.exit(1);
  }
  
  console.log("🚀 [3/3] Pulling latest code, wiping old server processes, and building the new site...");
  
  const deployCommand = `
    cd /var/www/234label && 
    git fetch origin && 
    git reset --hard origin/main && 
    npm install && 
    npm run build && 
    pm2 delete all && 
    PORT=3000 pm2 start npm --name "234label-web" -- start && 
    pm2 save
  `;
  
  const result = await ssh.execCommand(deployCommand);
  
  if (result.stdout) console.log("SERVER OUTPUT:\n", result.stdout);
  if (result.stderr) console.error("SERVER ERRORS (if any):\n", result.stderr);
  
  console.log("✨ ALL DONE! The server has been forcefully wiped and updated.");
  process.exit(0);
}

deploy();
