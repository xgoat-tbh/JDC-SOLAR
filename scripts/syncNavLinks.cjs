const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getHtmlFiles(path.join(__dirname, '../frontend'));
console.log('Total HTML files to process:', files.length);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Ensure nav-desktop has Resources before Contact
  if (content.includes('class="nav-desktop"') && !content.includes('href="/resources/" class="nav-desktop__link"')) {
    // Replace <li class="nav-desktop__item"><a href="/contact/" ... with Resources and Contact
    content = content.replace(
      /(<li class="nav-desktop__item">\s*<a href="\/contact\/")/g,
      '<li class="nav-desktop__item"><a href="/resources/" class="nav-desktop__link">Resources</a></li>\n          $1'
    );
    changed = true;
  }

  // 2. Ensure drawer nav has Resources before Contact
  if (content.includes('class="drawer__nav-list"') && !content.includes('href="/resources/" class="drawer__nav-link"')) {
    content = content.replace(
      /(<li class="drawer__nav-item">\s*<a href="\/contact\/")/g,
      '<li class="drawer__nav-item"><a href="/resources/" class="drawer__nav-link">Resources</a></li>\n        $1'
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', path.relative(path.join(__dirname, '../frontend'), file));
  }
});

console.log('All navigation links synced!');
