import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logos = [
  {
    name: 'waaree.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Waaree_logo.png'
  },
  {
    name: 'tata-power.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tata_Power_Solar_logo.png'
  },
  {
    name: 'adani-solar.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Adani_logo_2012.svg/320px-Adani_logo_2012.svg.png'
  },
  {
    name: 'havells.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Havells_Logo.svg/320px-Havells_Logo.svg.png'
  },
  {
    name: 'sungrow.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sungrow_Power_Supply.svg/320px-Sungrow_Power_Supply.svg.png'
  },
  {
    name: 'growatt.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Growatt_logo.svg/320px-Growatt_logo.svg.png'
  }
];

const destDir = path.join(__dirname, '..', 'frontend', 'assets', 'images', 'partners');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'JDCSolarBuildScript/1.0 (info@jdcsolar.in) NodeJS/20',
        'Accept': 'image/png,image/webp,image/*,*/*'
      }
    };

    https.get(options, (res) => {
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
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const logo of logos) {
    const dest = path.join(destDir, logo.name);
    try {
      await downloadFile(logo.url, dest);
      const stat = fs.statSync(dest);
      console.log(`Successfully downloaded ${logo.name} (${stat.size} bytes)`);
    } catch (e) {
      console.error(`Error for ${logo.name}: ${e.message}`);
    }
  }
}

run();
