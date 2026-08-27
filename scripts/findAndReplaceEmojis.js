import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, '..', 'frontend');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.html') || file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getFiles(frontendDir);
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}\u{1F1E0}-\u{1F1FF}]/u;

const results = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (emojiRegex.test(line)) {
      results.push({
        file: path.relative(frontendDir, file),
        lineNum: idx + 1,
        line: line.trim()
      });
    }
  });
});

console.log('Total lines with emojis found:', results.length);
results.forEach(r => {
  console.log(`[${r.file}:${r.lineNum}] ${r.line}`);
});
