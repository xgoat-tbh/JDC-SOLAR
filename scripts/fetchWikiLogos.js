import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destDir = path.join(__dirname, '..', 'frontend', 'assets', 'images', 'partners');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'JDCSolarBuild/1.0 (info@jdcsolar.in)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'JDCSolarBuild/1.0 (info@jdcsolar.in)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
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
  const apiUrl = 'https://commons.wikimedia.org/w/api.php?action=query&titles=File:Adani_logo_2012.svg|File:Havells_Logo.svg|File:Tata_Power_Logo.svg|File:Sungrow_Power_Supply.svg&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json';
  
  try {
    const data = await fetchJson(apiUrl);
    const pages = data.query.pages;
    for (const pageId in pages) {
      const page = pages[pageId];
      if (page.imageinfo && page.imageinfo[0]) {
        const info = page.imageinfo[0];
        console.log(`Found: ${page.title} -> ${info.thumburl || info.url}`);
        let outName = '';
        if (page.title.includes('Adani')) outName = 'adani-solar.png';
        if (page.title.includes('Havells')) outName = 'havells.png';
        if (page.title.includes('Tata')) outName = 'tata-power.png';
        if (page.title.includes('Sungrow')) outName = 'sungrow.png';
        
        if (outName) {
          const dest = path.join(destDir, outName);
          await downloadFile(info.thumburl || info.url, dest);
          const stat = fs.statSync(dest);
          console.log(`Saved ${outName} (${stat.size} bytes)`);
        }
      }
    }
  } catch (e) {
    console.error(`API Error: ${e.message}`);
  }
}

run();
