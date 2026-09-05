import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const targetDirs = ['frontend', 'api', 'tests', 'scripts'];
const ignoreDirs = new Set(['node_modules', '.git', 'dist', '.gemini', '.system_generated', '.tempmediaStorage', '.user_uploaded', 'scratch']);

function stripJsComments(code) {
  let result = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const char = code[i];
    const next = code[i + 1];

    
    if (char === '/' && next === '/') {
      i += 2;
      while (i < len && code[i] !== '\n' && code[i] !== '\r') {
        i++;
      }
      continue;
    }

    
    if (char === '/' && next === '*') {
      i += 2;
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) {
        i++;
      }
      i += 2;
      continue;
    }

    
    if (char === "'") {
      result += char;
      i++;
      while (i < len && code[i] !== "'") {
        if (code[i] === '\\') {
          result += code[i];
          i++;
        }
        if (i < len) {
          result += code[i];
          i++;
        }
      }
      if (i < len) {
        result += code[i];
        i++;
      }
      continue;
    }

    
    if (char === '"') {
      result += char;
      i++;
      while (i < len && code[i] !== '"') {
        if (code[i] === '\\') {
          result += code[i];
          i++;
        }
        if (i < len) {
          result += code[i];
          i++;
        }
      }
      if (i < len) {
        result += code[i];
        i++;
      }
      continue;
    }

    
    if (char === '`') {
      result += char;
      i++;
      while (i < len && code[i] !== '`') {
        if (code[i] === '\\') {
          result += code[i];
          i++;
        } else if (code[i] === '$' && code[i + 1] === '{') {
          result += '${';
          i += 2;
          
          let braceCount = 1;
          while (i < len && braceCount > 0) {
            const subChar = code[i];
            const subNext = code[i + 1];

            if (subChar === '/' && subNext === '/') {
              i += 2;
              while (i < len && code[i] !== '\n' && code[i] !== '\r') i++;
              continue;
            }
            if (subChar === '/' && subNext === '*') {
              i += 2;
              while (i < len && !(code[i] === '*' && code[i + 1] === '/')) i++;
              i += 2;
              continue;
            }
            if (subChar === "'" || subChar === '"' || subChar === '`') {
              const quote = subChar;
              result += quote;
              i++;
              while (i < len && code[i] !== quote) {
                if (code[i] === '\\') {
                  result += code[i];
                  i++;
                }
                if (i < len) {
                  result += code[i];
                  i++;
                }
              }
              if (i < len) {
                result += code[i];
                i++;
              }
              continue;
            }
            if (subChar === '{') braceCount++;
            if (subChar === '}') braceCount--;
            if (braceCount > 0 && i < len) {
              result += code[i];
              i++;
            }
          }
          if (i < len) {
            result += '}';
            i++;
          }
          continue;
        }
        if (i < len) {
          result += code[i];
          i++;
        }
      }
      if (i < len) {
        result += code[i];
        i++;
      }
      continue;
    }

    
    if (char === '/') {
      const prevTrimmed = result.trimEnd();
      const lastChar = prevTrimmed[prevTrimmed.length - 1];
      const isRegex = !lastChar || /[=(:,;!&|?+\-*%~^<>\[{]/.test(lastChar) ||
        /\b(return|typeof|instanceof|case|delete|throw|void|yield)\b$/.test(prevTrimmed);

      if (isRegex) {
        result += char;
        i++;
        let inCharClass = false;
        while (i < len && (inCharClass || code[i] !== '/')) {
          if (code[i] === '\\') {
            result += code[i];
            i++;
          } else if (code[i] === '[') {
            inCharClass = true;
          } else if (code[i] === ']') {
            inCharClass = false;
          }
          if (i < len) {
            result += code[i];
            i++;
          }
        }
        if (i < len) {
          result += code[i];
          i++;
        }
        
        while (i < len && /[a-z]/i.test(code[i])) {
          result += code[i];
          i++;
        }
        continue;
      }
    }

    result += char;
    i++;
  }

  return cleanExtraBlankLines(result);
}

function stripCssComments(css) {
  
  const result = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return cleanExtraBlankLines(result);
}

function stripHtmlComments(html) {
  
  const result = html.replace(/<!--[\s\S]*?-->/g, '');
  return cleanExtraBlankLines(result);
}

function stripPhpComments(php) {
  
  let result = php.replace(/\/\*[\s\S]*?\*\//g, '');
  result = result.replace(/(^|[^:])\/\/[^\r\n]*/g, '$1');
  result = result.replace(/(^|\s)#[^\r\n]*/g, '$1');
  return cleanExtraBlankLines(result);
}

function cleanExtraBlankLines(content) {
  
  return content.replace(/(\r?\n){3,}/g, '\n\n').trim() + '\n';
}

function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const content = fs.readFileSync(filePath, 'utf8');
  let cleaned = content;

  if (ext === '.js' || ext === '.mjs') {
    cleaned = stripJsComments(content);
  } else if (ext === '.css') {
    cleaned = stripCssComments(content);
  } else if (ext === '.html' || ext === '.svg') {
    cleaned = stripHtmlComments(content);
  } else if (ext === '.php') {
    cleaned = stripPhpComments(content);
  } else {
    return false;
  }

  if (cleaned !== content) {
    fs.writeFileSync(filePath, cleaned, 'utf8');
    return true;
  }
  return false;
}

function walkAndStrip(dir) {
  let modifiedCount = 0;
  if (!fs.existsSync(dir)) return modifiedCount;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      modifiedCount += walkAndStrip(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.js', '.mjs', '.css', '.html', '.svg', '.php'].includes(ext)) {
        if (processFile(fullPath)) {
          modifiedCount++;
        }
      }
    }
  }
  return modifiedCount;
}

console.log('----------------------------------------------------');
console.log('JDC SOLAR 2.0 — STRIPPING COMMENTS CODEBASE-WIDE');
console.log('----------------------------------------------------');

let totalModified = 0;
for (const dir of targetDirs) {
  const targetPath = path.join(rootDir, dir);
  const count = walkAndStrip(targetPath);
  console.log(`✓ Stripped comments in ${dir}/ (${count} files updated)`);
  totalModified += count;
}

console.log('----------------------------------------------------');
console.log(`TOTAL FILES CLEANED: ${totalModified}`);
console.log('----------------------------------------------------');
