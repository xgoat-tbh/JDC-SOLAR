import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const ignoreDirs = new Set(['node_modules', '.git', 'dist', '.gemini', '.system_generated', '.tempmediaStorage', '.user_uploaded', 'scratch']);
const fileExts = ['.html', '.css', '.js', '.json', '.svg', '.md', '.htaccess'];

function countLoc(content, ext) {
  let cleaned = content;

  if (ext === '.js' || ext === '.css') {
    
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    if (ext === '.js') {
      
      cleaned = cleaned.replace(/\/\/.*$/gm, '');
    }
  } else if (ext === '.html' || ext === '.svg') {
    
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  } else if (ext === '.htaccess') {
    
    cleaned = cleaned.replace(/#.*$/gm, '');
  }

  const lines = cleaned.split(/\r?\n/);
  let totalLines = 0;
  let codeLines = 0;
  let commentLines = 0;
  let blankLines = 0;

  const rawLines = content.split(/\r?\n/);
  totalLines = rawLines.length;

  for (const line of lines) {
    if (line.trim().length === 0) {
      blankLines++;
    } else {
      codeLines++;
    }
  }

  commentLines = totalLines - codeLines - blankLines;

  return { totalLines, codeLines, blankLines, commentLines: Math.max(0, totalLines - codeLines) };
}

const breakdown = {};
let totalAll = { total: 0, code: 0, rawLines: 0 };

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (fileExts.includes(ext) || entry.name === '.htaccess') {
        const key = ext || entry.name;
        if (!breakdown[key]) {
          breakdown[key] = { count: 0, rawLines: 0, codeLines: 0 };
        }
        const content = fs.readFileSync(fullPath, 'utf8');
        const counts = countLoc(content, key);
        breakdown[key].count++;
        breakdown[key].rawLines += counts.totalLines;
        breakdown[key].codeLines += counts.codeLines;
        totalAll.code += counts.codeLines;
        totalAll.rawLines += counts.totalLines;
        totalAll.total++;
      }
    }
  }
}

walk(rootDir);

console.log('----------------------------------------------------');
console.log('JDC SOLAR 2.0 — LINES OF CODE (EXCLUDING COMMENTS)');
console.log('----------------------------------------------------');
console.table(breakdown);
console.log(`TOTAL CODE FILES: ${totalAll.total}`);
console.log(`TOTAL RAW LINES: ${totalAll.rawLines.toLocaleString()}`);
console.log(`TOTAL CODE LINES (EXCLUDING COMMENTS & BLANKS): ${totalAll.code.toLocaleString()}`);
console.log('----------------------------------------------------');
