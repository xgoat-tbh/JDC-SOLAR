import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destDir = path.join(__dirname, '..', 'frontend', 'assets', 'images', 'partners');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let newUrl = res.headers.location;
        if (!newUrl.startsWith('http')) {
          const origin = new URL(url).origin;
          newUrl = origin + newUrl;
        }
        return download(newUrl, dest).then(resolve).catch(reject);
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
  const urls = [
    'https://www.waaree.com/upload/media/image_1_1_1749036191.png',
    'https://www.waaree.com/assets/images/logo.png',
    'https://www.waaree.com/images/logo.png'
  ];

  for (const u of urls) {
    try {
      const dest = path.join(destDir, 'waaree.png');
      await download(u, dest);
      const stat = fs.statSync(dest);
      if (stat.size > 500) {
        console.log(`Successfully downloaded waaree.png (${stat.size} bytes) from ${u}`);
        break;
      }
    } catch (e) {
      console.log(`Failed ${u}: ${e.message}`);
    }
  }
}

run();
