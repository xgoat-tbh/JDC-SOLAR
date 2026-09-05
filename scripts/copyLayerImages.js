import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const brainDir = 'C:\\Users\\Outcast\\.gemini\\antigravity\\brain\\58f1ccba-d83c-4985-878b-d4d963786e81';
const destDir = path.join(__dirname, '..', 'frontend', 'assets', 'images', 'exploded');

const mapping = [
  { src: 'solar_glass_layer_1787987002381.jpg', dest: 'layer-glass.jpg' },
  { src: 'solar_coating_layer_1787987022210.jpg', dest: 'layer-coating.jpg' },
  { src: 'solar_cells_layer_1787987041108.jpg', dest: 'layer-cells.jpg' },
  { src: 'solar_eva_layer_1787987060061.jpg', dest: 'layer-eva.jpg' },
  { src: 'solar_frame_layer_1787987080305.jpg', dest: 'layer-frame.jpg' }
];

for (const item of mapping) {
  const srcPath = path.join(brainDir, item.src);
  const destPath = path.join(destDir, item.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.error(`Missing: ${srcPath}`);
  }
}
