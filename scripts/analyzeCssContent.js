import fs from 'fs';

const css = fs.readFileSync('dist/css/main.css', 'utf8');
console.log('Total characters:', css.length);

// Check occurrences of common large patterns
const rules = css.split('}');
console.log('Total rules count:', rules.length);

// Count keyframes
const keyframes = css.match(/@keyframes\s+[\w-]+/g) || [];
console.log('Keyframes:', keyframes);

// Check for base64 strings or huge inline assets
const base64 = css.match(/data:[^)]+/g) || [];
console.log('Base64 data URIs count:', base64.length);
if (base64.length) {
  let b64Total = base64.reduce((acc, cur) => acc + cur.length, 0);
  console.log('Base64 total size:', (b64Total / 1024).toFixed(1) + ' KB');
}
