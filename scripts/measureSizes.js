import fs from 'fs';
import path from 'path';

const main = fs.readFileSync('frontend/css/main.css', 'utf8');
const regex = /@import\s+url\(['"]?(.+?)['"]?\);/g;
let m;
let total = 0;
const items = [];
while ((m = regex.exec(main)) !== null) {
  const p = path.resolve('frontend/css', m[1]);
  if (fs.existsSync(p)) {
    const size = fs.statSync(p).size;
    total += size;
    items.push({ name: m[1], size });
  }
}
items.sort((a, b) => b.size - a.size);
items.forEach(it => console.log(it.name.padEnd(35) + ' ' + (it.size / 1024).toFixed(1) + ' KB'));
console.log('Total unminified: ' + (total / 1024).toFixed(1) + ' KB');
