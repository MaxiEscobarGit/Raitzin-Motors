const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const PASSWORD = 'Cooper2323';
const SALT_ROUNDS = 12;
const ENV_PATH = path.join(__dirname, '.env.local');

async function main() {
  const hash = await bcrypt.hash(PASSWORD, SALT_ROUNDS);

  let content = fs.readFileSync(ENV_PATH, 'utf8');

  if (/^ADMIN_PASSWORD_HASH=.*/m.test(content)) {
    content = content.replace(/^ADMIN_PASSWORD_HASH=.*/m, `ADMIN_PASSWORD_HASH=${hash}`);
  } else {
    content += `\nADMIN_PASSWORD_HASH=${hash}\n`;
  }

  fs.writeFileSync(ENV_PATH, content, 'utf8');
  console.log('Hash actualizado en .env.local');
}

main();
