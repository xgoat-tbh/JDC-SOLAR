import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logos = [
  { name: 'waaree.png', url: 'https://logo.clearbit.com/waaree.com' },
  { name: 'tata-power.png', url: 'https://logo.clearbit.com/tatapower.com' },
  { name: 'adani-solar.png', url: 'https://logo.clearbit.com/adani.com' },
  { name: 'growatt.png', url: 'https://logo.clearbit.com/growatt.com' },
  { name: 'havells.png', url: 'https://logo.clearbit.com/havells.com' },
  { name: 'sungrow.png', url: 'https://logo.clearbit.com/sungrowpower.com' }
];

const destDir = path.join(__dirname, '..', 'frontend', 'assets', 'images', 'partners');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const logo of logos) {
    const dest = path.join(destDir, logo.name);
    try {
      await downloadFile(logo.url, dest);
      const stat = fs.statSync(dest);
      console.log(`Success: ${logo.name} (${stat.size} bytes)`);
    } catch (e) {
      console.error(`Error ${logo.name}: ${e.message}`);
    }
  }
}

run();
