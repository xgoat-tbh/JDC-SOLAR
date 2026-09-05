import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destDir = path.join(__dirname, '..', 'frontend', 'assets', 'images', 'partners');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
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
  const url = 'https://d2ehz7r19zq528.cloudfront.net/Waaree-logo_vufgvr.svg';
  const pngUrl = 'https://waaree.com/wp-content/uploads/2023/11/Waaree-logo.png';
  
  try {
    await downloadFile(url, path.join(destDir, 'waaree.svg'));
    console.log('Saved waaree.svg from official Waaree CDN');
  } catch (e) {
    console.log('SVG error:', e.message);
  }

  try {
    await downloadFile(pngUrl, path.join(destDir, 'waaree.png'));
    console.log('Saved waaree.png from official Waaree site');
  } catch (e) {
    console.log('PNG error:', e.message);
  }
}

run();
