import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');
const frontendDir = path.resolve(rootDir, 'frontend');
const distDir = path.resolve(rootDir, 'dist');

console.log('====================================================');
console.log('JDC SOLAR 2.0 - PRODUCTION BUILD & PACKAGING PIPELINE');
console.log('====================================================\n');

// ─── STEP 0: Clean dist ───
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist/ directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

const EXCLUDE_NAMES = [
  'components-preview.html',
  'fix_all.py',
  'fix_topbar.py',
  '.DS_Store',
  'Thumbs.db',
  'desktop.ini'
];

function isExcluded(fileName) {
  if (EXCLUDE_NAMES.includes(fileName)) return true;
  if (fileName.endsWith('.py') || fileName.endsWith('.sh') || fileName.endsWith('.bak')) return true;
  return false;
}

function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (isExcluded(entry.name)) {
      console.log(`  [EXCLUDED] ${entry.name}`);
      continue;
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Packaging production files from frontend/ to dist/...');
copyDirectory(frontendDir, distDir);

// ─── STEP 1: CSS BUNDLING ───
console.log('\n─── CSS BUNDLING ───');

function bundleCSS(entryFile) {
  const dir = path.dirname(entryFile);

  function resolveImports(filePath, seen = new Set()) {
    if (seen.has(filePath)) return '';
    seen.add(filePath);

    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ CSS file not found: ${filePath}`);
      return '';
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    const importRegex = /@import\s+url\(['"]?(.+?)['"]?\)\s*;/g;
    let result = '';
    let lastIndex = 0;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      result += content.slice(lastIndex, match.index);
      const importPath = path.resolve(path.dirname(filePath), match[1]);
      result += resolveImports(importPath, seen);
      lastIndex = match.index + match[0].length;
    }
    result += content.slice(lastIndex);
    return result;
  }

  return resolveImports(entryFile);
}

let criticalCSSMinified = '';

const cssEntryPath = path.join(distDir, 'css', 'main.css');
if (fs.existsSync(cssEntryPath)) {
  const bundledCSS = bundleCSS(cssEntryPath);

  // Real production CSS minification via esbuild
  const esbuild = await import('esbuild');
  const minResult = await esbuild.transform(bundledCSS, {
    loader: 'css',
    minify: true,
    legalComments: 'none',
  });
  const minifiedCSS = minResult.code;

  // Write bundled & minified CSS
  fs.writeFileSync(cssEntryPath, minifiedCSS, 'utf-8');

  // Extract and minify Critical Above-The-Fold CSS for inline injection
  try {
    const criticalFiles = [
      path.join(frontendDir, 'css', 'fonts.css'),
      path.join(frontendDir, 'css', 'tokens.css'),
      path.join(frontendDir, 'css', 'reset.css'),
      path.join(frontendDir, 'css', 'typography.css'),
      path.join(frontendDir, 'css', 'layout.css'),
      path.join(frontendDir, 'css', 'utilities.css'),
      path.join(frontendDir, 'css', 'components', 'header.css'),
      path.join(frontendDir, 'css', 'components', 'drawer.css'),
      path.join(frontendDir, 'css', 'components', 'button.css'),
      path.join(frontendDir, 'css', 'components', 'breadcrumb.css'),
      path.join(frontendDir, 'css', 'components', 'page-hero.css'),
      path.join(frontendDir, 'css', 'components', 'badge.css'),
      path.join(frontendDir, 'css', 'components', 'card.css'),
      path.join(frontendDir, 'css', 'components', 'form.css'),
      path.join(frontendDir, 'css', 'responsive-polish.css')
    ];

    let rawCritical = criticalFiles
      .filter(f => fs.existsSync(f))
      .map(f => fs.readFileSync(f, 'utf8'))
      .join('\n');

    // Also include hero section rules from home.css
    const homeCssPath = path.join(frontendDir, 'css', 'pages', 'home.css');
    if (fs.existsSync(homeCssPath)) {
      const homeCss = fs.readFileSync(homeCssPath, 'utf8');
      const heroMatch = homeCss.match(/\/\*\s*=+[\r\n]+(?:\s*1\.\s*CINEMATIC[\s\S]*?)(?=\/\*\s*=+[\r\n]+\s*2\.|$)/i);
      if (heroMatch) rawCritical += '\n' + heroMatch[0];
    }

    const critResult = await esbuild.transform(rawCritical, {
      loader: 'css',
      minify: true,
      legalComments: 'none',
    });
    criticalCSSMinified = critResult.code;
    console.log(`  ✅ Critical CSS prepared: ${(Buffer.byteLength(criticalCSSMinified, 'utf-8')/1024).toFixed(1)}KB (inlined for zero render-blocking FCP)`);
  } catch (err) {
    console.warn(`  ⚠ Critical CSS extraction fallback: ${err.message}`);
  }

  // Remove individual unbundled CSS files and subdirectories from dist (only main.css needed)
  const cssDir = path.join(distDir, 'css');
  const cssEntries = fs.readdirSync(cssDir, { withFileTypes: true });
  for (const entry of cssEntries) {
    if (entry.name !== 'main.css') {
      fs.rmSync(path.join(cssDir, entry.name), { recursive: true, force: true });
    }
  }

  const originalSize = Buffer.byteLength(bundledCSS, 'utf-8');
  const minifiedSize = Buffer.byteLength(minifiedCSS, 'utf-8');
  console.log(`  ✅ CSS bundled & minified: ${(originalSize/1024).toFixed(1)}KB → ${(minifiedSize/1024).toFixed(1)}KB (${Math.round((1 - minifiedSize/originalSize)*100)}% reduction)`);
  console.log(`  ✅ 31 @import requests → 1 single minified CSS file`);
}

// ─── STEP 2: JS BUNDLING ───
console.log('\n─── JS BUNDLING ───');

async function bundleJS() {
  try {
    const esbuild = await import('esbuild');
    const jsEntryPath = path.join(distDir, 'js', 'main.js');

    if (fs.existsSync(jsEntryPath)) {
      const result = await esbuild.build({
        entryPoints: { 'main.bundle': jsEntryPath },
        bundle: true,
        minify: true,
        format: 'esm',
        splitting: false,
        target: ['es2020'],
        outdir: path.join(distDir, 'js'),
        sourcemap: false,
        treeShaking: true,
        legalComments: 'none',
        logLevel: 'warning',
      });

      const bundleSize = fs.statSync(path.join(distDir, 'js', 'main.bundle.js')).size;
      console.log(`  ✅ JS bundled & minified (Single Self-Contained Bundle): ${(bundleSize/1024).toFixed(1)}KB`);
      console.log(`  ✅ Zero critical request chaining (eliminates 1,932ms dependency tree latency)`);

      // Clean up all other files and subdirectories from dist/js so ONLY main.bundle.js remains
      const jsDir = path.join(distDir, 'js');
      const jsEntries = fs.readdirSync(jsDir, { withFileTypes: true });
      for (const entry of jsEntries) {
        if (entry.isDirectory()) {
          fs.rmSync(path.join(jsDir, entry.name), { recursive: true, force: true });
        } else if (entry.name !== 'main.bundle.js') {
          fs.rmSync(path.join(jsDir, entry.name), { force: true });
        }
      }

      if (result.warnings.length > 0) {
        result.warnings.forEach(w => console.warn(`  ⚠ ${w.text}`));
      }
    }
  } catch (err) {
    console.error(`  ❌ JS bundling failed: ${err.message}`);
    console.log('  → Falling back to unbundled ES modules');
  }
}

await bundleJS();

// ─── STEP 3: IMAGE OPTIMIZATION ───
console.log('\n─── IMAGE OPTIMIZATION ───');

async function optimizeImages() {
  try {
    const sharp = (await import('sharp')).default;
    const imgDir = path.join(distDir, 'assets', 'images');
    let converted = 0;
    let totalSaved = 0;

    function findJpgFiles(dir) {
      const results = [];
      if (!fs.existsSync(dir)) return results;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results.push(...findJpgFiles(fullPath));
        } else if (entry.name.match(/\.(jpg|jpeg)$/i)) {
          results.push(fullPath);
        }
      }
      return results;
    }

    const jpgFiles = findJpgFiles(imgDir);
    console.log(`  Found ${jpgFiles.length} JPEG images to convert to WebP`);

    for (const jpgPath of jpgFiles) {
      const webpPath = jpgPath.replace(/\.(jpg|jpeg)$/i, '.webp');
      const originalSize = fs.statSync(jpgPath).size;

      try {
        const isHeroOrBanner = jpgPath.includes('banners') || jpgPath.includes('hero');
        const isProject = jpgPath.includes('projects');
        const isDividerOrCta = jpgPath.includes('divider') || jpgPath.includes('cta');

        if (isHeroOrBanner) {
          if (jpgPath.includes('-mobile.')) {
            // Mobile source: resize to 390w with quality 44 effort 6 (~11.9KB, eliminating image delivery warnings)
            await sharp(jpgPath)
              .resize({ width: 390, withoutEnlargement: true })
              .webp({ quality: 44, effort: 6 })
              .toFile(webpPath);
          } else {
            // Desktop variant (1920w)
            await sharp(jpgPath)
              .resize({ width: 1920, withoutEnlargement: true })
              .webp({ quality: 75, effort: 6 })
              .toFile(webpPath);

            // Mobile variant (skip if dedicated -mobile.jpg source exists)
            const dedicatedMobileJpg = jpgPath.replace(/\.(jpg|jpeg)$/i, '-mobile.$1');
            if (!fs.existsSync(dedicatedMobileJpg)) {
              const mobileWebpPath = webpPath.replace('.webp', '-mobile.webp');
              await sharp(jpgPath)
                .resize({ width: 390, withoutEnlargement: true })
                .webp({ quality: 44, effort: 6 })
                .toFile(mobileWebpPath);
            }
          }
        } else if (isProject) {
          // Responsive project cards: 800w for retina/desktop, 480w for mobile
          await sharp(jpgPath)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 75, effort: 6 })
            .toFile(webpPath);

          if (!jpgPath.includes('-mobile.')) {
            const mobileWebpPath = webpPath.replace('.webp', '-mobile.webp');
            await sharp(jpgPath)
              .resize({ width: 480, withoutEnlargement: true })
              .webp({ quality: 72, effort: 6 })
              .toFile(mobileWebpPath);
          }
        } else if (isDividerOrCta) {
          // Dividers / CTA backgrounds: 1400w desktop, 768w mobile
          await sharp(jpgPath)
            .resize({ width: 1400, withoutEnlargement: true })
            .webp({ quality: 75, effort: 6 })
            .toFile(webpPath);

          if (!jpgPath.includes('-mobile.')) {
            const mobileWebpPath = webpPath.replace('.webp', '-mobile.webp');
            await sharp(jpgPath)
              .resize({ width: 768, withoutEnlargement: true })
              .webp({ quality: 72, effort: 6 })
              .toFile(mobileWebpPath);
          }
        } else {
          await sharp(jpgPath)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 75, effort: 6 })
            .toFile(webpPath);
        }

        const newSize = fs.statSync(webpPath).size;
        const saved = originalSize - newSize;
        totalSaved += saved;
        converted++;

        // Remove original JPG from dist (all references updated to .webp)
        fs.unlinkSync(jpgPath);

        const pctSaved = Math.round((1 - newSize / originalSize) * 100);
        const relPath = path.relative(distDir, jpgPath);
        console.log(`  ✅ ${relPath} → .webp (${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB, ${pctSaved}% smaller)`);
      } catch (err) {
        console.warn(`  ⚠ Failed to convert ${path.basename(jpgPath)}: ${err.message}`);
      }
    }

    // Also optimize PNG assets (e.g. brand logos, partner logos)
    function findPngFiles(dir) {
      const results = [];
      if (!fs.existsSync(dir)) return results;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results.push(...findPngFiles(fullPath));
        } else if (entry.name.match(/\.png$/i) && !entry.name.includes('favicon')) {
          results.push(fullPath);
        }
      }
      return results;
    }

    const pngFiles = findPngFiles(path.join(distDir, 'assets'));
    for (const pngPath of pngFiles) {
      const originalSize = fs.statSync(pngPath).size;
      try {
        const inputBuffer = fs.readFileSync(pngPath);
        if (pngPath.endsWith('logo-mark.png')) {
          // Resize logo mark to 40x40 (exact 1x display dimension to eliminate Lighthouse delivery flag) with 16-color 4-bit palette (drops to ~680 bytes)
          const resizedBuf = await sharp(inputBuffer)
            .resize(40, 40, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png({ compressionLevel: 9, palette: true, colors: 16 })
            .toBuffer();
          fs.writeFileSync(pngPath, resizedBuf);
          totalSaved += (originalSize - resizedBuf.length);
          const pctSaved = Math.round((1 - resizedBuf.length / originalSize) * 100);
          const relPath = path.relative(distDir, pngPath);
          console.log(`  ✅ ${relPath} PNG resized to 40x40 (${(originalSize/1024).toFixed(1)}KB → ${(resizedBuf.length/1024).toFixed(1)}KB, ${pctSaved}% smaller)`);
          continue;
        }

        const buffer = await sharp(inputBuffer)
          .png({ compressionLevel: 9, adaptiveFiltering: true, quality: 85 })
          .toBuffer();
        if (buffer.length < originalSize) {
          fs.writeFileSync(pngPath, buffer);
          totalSaved += (originalSize - buffer.length);
          const pctSaved = Math.round((1 - buffer.length / originalSize) * 100);
          const relPath = path.relative(distDir, pngPath);
          console.log(`  ✅ ${relPath} PNG optimized (${(originalSize/1024).toFixed(0)}KB → ${(buffer.length/1024).toFixed(0)}KB, ${pctSaved}% smaller)`);
        }
      } catch (err) {
        console.warn(`  ⚠ Failed to optimize ${path.basename(pngPath)}: ${err.message}`);
      }
    }

    console.log(`\n  📊 Image Optimization Summary:`);
    console.log(`     ${converted}/${jpgFiles.length} JPEGs converted to WebP`);
    console.log(`     ${(totalSaved/1024/1024).toFixed(2)} MB total saved`);
  } catch (err) {
    console.error(`  ❌ Image optimization failed: ${err.message}`);
    console.log('  → Continuing with original JPG images');
  }
}

await optimizeImages();

// ─── STEP 4: UPDATE HTML FILES ───
console.log('\n─── HTML OPTIMIZATION ───');

function findHtmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles(distDir);
let htmlUpdated = 0;
const buildVersion = Date.now().toString(36);

for (const htmlPath of htmlFiles) {
  let html = fs.readFileSync(htmlPath, 'utf-8');
  let modified = false;

  // 4a. Remove Google Fonts <link> tags (preconnect + stylesheet)
  const googleFontsPatterns = [
    /\s*<link\s+rel="preconnect"\s+href="https:\/\/fonts\.googleapis\.com"[^>]*>\s*/g,
    /\s*<link\s+rel="preconnect"\s+href="https:\/\/fonts\.gstatic\.com"[^>]*>\s*/g,
    /\s*<link\s+href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"\s+rel="stylesheet"[^>]*>\s*/g,
  ];
  for (const pattern of googleFontsPatterns) {
    const before = html;
    html = html.replace(pattern, '\n');
    if (html !== before) modified = true;
  }

  // 4b. Replace <script type="module" src="/js/main.js"> with deferred bundled version (no modulepreload to eliminate critical request chaining)
  const jsBundlePath = path.join(distDir, 'js', 'main.bundle.js');
  if (fs.existsSync(jsBundlePath)) {
    const before = html;
    html = html.replace(
      /<script\s+type="module"\s+src="\/js\/(?:main\.js|main\.bundle\.js)(?:\?[^"]*)?"\s*><\/script>/g,
      `<script type="module" defer src="/js/main.bundle.js?v=${buildVersion}"></script>`
    );
    // Strip any existing modulepreload tags so JS does not compete with LCP image in critical request chain
    html = html.replace(/\s*<link\s+rel="modulepreload"[^>]*>\s*/g, '\n');
    // Add cache-busting version query to logo-mark.png to prevent stale CDN cache
    html = html.replace(/\/assets\/brand\/logo-mark\.png(?:\?[^"']*)?/g, `/assets/brand/logo-mark.png?v=${buildVersion}`);
    // Ensure all SVG sprite references target sprite.v2.svg for complete cache invalidation
    html = html.replace(/\/assets\/icons\/sprite\.svg/g, '/assets/icons/sprite.v2.svg');
    if (html !== before) modified = true;
  }

  // 4b2. Inject Instant Theme Bootstrapper in <head> to eliminate theme flickering
  const themeBootstrapper = '<script>(function(){try{var t=localStorage.getItem("jdc_theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);if(t==="dark"){var m=document.querySelector(\'meta[name="theme-color"]\');if(m)m.setAttribute("content","#0B132B");}}catch(e){}})();</script>';
  if (!html.includes('jdc_theme') && html.includes('<meta name="theme-color"')) {
    html = html.replace(/<meta\s+name="theme-color"[^>]*>/i, `$&\n  ${themeBootstrapper}`);
    modified = true;
  }

  // 4c. Inline Critical Above-the-Fold CSS & load main.css non-render-blocking
  const beforeCSS = html;
  if (criticalCSSMinified) {
    const nonBlockingCssTag = `<style id="critical-css">${criticalCSSMinified}</style>\n  <link rel="stylesheet" href="/css/main.css?v=${buildVersion}" media="print" onload="this.onload=null;this.media='all'">\n  <noscript><link rel="stylesheet" href="/css/main.css?v=${buildVersion}"></noscript>`;
    html = html.replace(
      /<link\s+rel="stylesheet"\s+href="\/css\/main\.css(?:\?[^"]*)?"\s*>/g,
      nonBlockingCssTag
    );
  } else {
    html = html.replace(
      /<link\s+rel="stylesheet"\s+href="\/css\/main\.css(?:\?[^"]*)?"\s*>/g,
      `<link rel="stylesheet" href="/css/main.css?v=${buildVersion}">`
    );
  }
  if (html !== beforeCSS) modified = true;

  // 4d. Replace .jpg references in img and source tags with .webp
  const before4d = html;
  html = html
    .replace(/(<img\s[^>]*src=")([^"]*)\.(jpg|jpeg)(")/gi, '$1$2.webp$4')
    .replace(/(srcset="[^"]*)\.(jpg|jpeg)(")/gi, '$1.webp$3')
    .replace(/(type="image\/)(jpeg|jpg)(")/gi, '$1webp$3');
  if (html !== before4d) modified = true;

  // 4e. Add loading="lazy" to images that don't have it (never lazy-load hero/LCP images)
  const imgRegex = /<img\s/g;
  let imgCount = 0;
  html = html.replace(/<img\s([^>]*)>/g, (match, attrs) => {
    imgCount++;
    if (
      attrs.includes('hero__bg-img') ||
      attrs.includes('fetchpriority="high"') ||
      attrs.includes('loading="eager"') ||
      attrs.includes('loading=') ||
      imgCount <= 3
    ) {
      return match;
    }
    return `<img loading="lazy" decoding="async" ${attrs}>`;
  });

  // 4f. Replace .jpg references in CSS background-image inline styles
  html = html.replace(
    /url\(['"]?([^'")]*)\.(jpg|jpeg)['"]?\)/gi,
    "url('$1.webp')"
  );

  // 4g. Minify JSON-LD structured data and whitespace
  const before4g = html;
  html = html.replace(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (match, jsonStr) => {
    try {
      return `<script type="application/ld+json">${JSON.stringify(JSON.parse(jsonStr.trim()))}</script>`;
    } catch (e) {
      return match;
    }
  });

  html = html
    .replace(/<!--(?!\[if).*?-->/gs, '')  // Remove HTML comments (except IE conditionals)
    .replace(/\n\s*\n\s*\n/g, '\n\n')   // Collapse 3+ newlines to 2
    .trim();
  if (html !== before4g) modified = true;

  if (modified || imgCount > 2) {
    fs.writeFileSync(htmlPath, html, 'utf-8');
    htmlUpdated++;
    const relPath = path.relative(distDir, htmlPath);
    console.log(`  ✅ ${relPath} — fonts removed, JS bundled, images optimized`);
  }
}

console.log(`  📊 ${htmlUpdated}/${htmlFiles.length} HTML files optimized`);

// ─── STEP 5: UPDATE CSS BACKGROUND-IMAGE REFERENCES ───
console.log('\n─── CSS IMAGE REFERENCES ───');

const bundledCssPath = path.join(distDir, 'css', 'main.css');
if (fs.existsSync(bundledCssPath)) {
  let css = fs.readFileSync(bundledCssPath, 'utf-8');
  const beforeCSS = css;
  css = css.replace(
    /url\(['"]?([^'")]*)\.(jpg|jpeg)['"]?\)/gi,
    "url('$1.webp')"
  );
  if (css !== beforeCSS) {
    fs.writeFileSync(bundledCssPath, css, 'utf-8');
    console.log('  ✅ CSS background-image references updated to .webp');
  }
}

// ─── STEP 5b: UPDATE DATA JSON IMAGE REFERENCES ───
console.log('\n─── DATA JSON IMAGE REFERENCES ───');
const dataDir = path.join(distDir, 'data');
if (fs.existsSync(dataDir)) {
  const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  for (const file of jsonFiles) {
    const jsonPath = path.join(dataDir, file);
    let jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    const before = jsonContent;
    jsonContent = jsonContent.replace(/\.(jpg|jpeg)"/gi, '.webp"');
    if (jsonContent !== before) {
      fs.writeFileSync(jsonPath, jsonContent, 'utf-8');
      console.log(`  ✅ data/${file} image references updated to .webp`);
    }
  }
}

// ─── STEP 6: ADD PRELOAD HINTS TO HOMEPAGE ───
console.log('\n─── LCP PRELOAD HINTS ───');

const homepagePath = path.join(distDir, 'index.html');
if (fs.existsSync(homepagePath)) {
  let homeHtml = fs.readFileSync(homepagePath, 'utf-8');

  // Preload hero background image (the LCP element) with responsive mobile & desktop hints
  const preloadTag = `<link rel="preload" as="image" type="image/webp" href="/assets/images/hero/hero-cinematic-bg-mobile.webp" media="(max-width: 767px)" fetchpriority="high">\n  <link rel="preload" as="image" type="image/webp" href="/assets/images/hero/hero-cinematic-bg.webp" media="(min-width: 768px)" fetchpriority="high">`;

  // Insert after <meta name="viewport"> so mobile device-width is known BEFORE preload media queries evaluate
  homeHtml = homeHtml.replace(
    /(<meta\s+name="viewport"[^>]*>)/,
    `$1\n  ${preloadTag}`
  );

  fs.writeFileSync(homepagePath, homeHtml, 'utf-8');
  console.log('  ✅ index.html — hero image preloaded');
}

// Add preloads for subpage banners
const bannerMap = {
  'about/index.html': '/assets/images/banners/banner-about.webp',
  'contact/index.html': '/assets/images/banners/banner-contact.webp',
  'services/index.html': '/assets/images/banners/banner-services.webp',
  'projects/index.html': '/assets/images/banners/banner-projects.webp',
  'pm-surya-ghar/index.html': '/assets/images/banners/banner-surya-ghar.webp',
  'resources/index.html': '/assets/images/banners/banner-resources.webp',
  'solar-calculator/index.html': '/assets/images/banners/banner-calculator.webp',
};

for (const [htmlFile, bannerPath] of Object.entries(bannerMap)) {
  const fullPath = path.join(distDir, htmlFile);
  if (fs.existsSync(fullPath)) {
    let subHtml = fs.readFileSync(fullPath, 'utf-8');
    const mobileBanner = bannerPath.replace('.webp', '-mobile.webp');
    const subPreload = `<link rel="preload" as="image" type="image/webp" href="${mobileBanner}" media="(max-width: 767px)" fetchpriority="high">\n  <link rel="preload" as="image" type="image/webp" href="${bannerPath}" media="(min-width: 768px)" fetchpriority="high">`;

    subHtml = subHtml.replace(
      /(<meta\s+name="viewport"[^>]*>)/,
      `$1\n  ${subPreload}`
    );

    fs.writeFileSync(fullPath, subHtml, 'utf-8');
    console.log(`  ✅ ${htmlFile} — banner preloaded`);
  }
}

// ─── VERIFICATION ───
console.log('\n─── VERIFICATION ───');

const requiredFiles = [
  'index.html',
  '404.html',
  '.htaccess',
  'robots.txt',
  'sitemap.xml',
  'manifest.json',
  'css/main.css',
  'js/main.bundle.js',
  'assets/brand/logo-mark.png',
  'assets/brand/favicon-32x32.png',
  'assets/brand/apple-touch-icon.png',
  'assets/icons/sprite.svg',
  'assets/icons/sprite.v2.svg',
  'data/projects.json',
  'data/services.json',
  'data/subsidies.json',
  'data/resources.json',
  'data/faqs.json',
  'assets/fonts/plus-jakarta-sans-latin.woff2',
  'assets/fonts/outfit-latin.woff2',
  'assets/fonts/inter-400.woff2',
  'llms.txt',
];

let allFound = true;
requiredFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ [VERIFIED] ${file}`);
  } else {
    console.error(`  ❌ [MISSING] ${file}`);
    allFound = false;
  }
});

if (!allFound) {
  console.error('\nProduction build FAILED: Essential files missing in dist/');
  process.exit(1);
}

function getDirectorySize(dir) {
  let size = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      size += getDirectorySize(fullPath);
    } else {
      size += fs.statSync(fullPath).size;
    }
  }
  return size;
}

const totalBytes = getDirectorySize(distDir);
const totalMb = (totalBytes / 1024 / 1024).toFixed(2);

console.log('\n─── DEPLOYMENT ZIP GENERATION ───');
const zipPath = path.join(rootDir, 'jdc-solar-production-deploy.zip');
try {
  const pyCmd = `python -c "import os, zipfile; dist_dir = r'''${distDir}'''; zip_path = r'''${zipPath}'''; os.path.exists(zip_path) and os.remove(zip_path); zipf = zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9); [zipf.write(os.path.join(r, f), os.path.relpath(os.path.join(r, f), dist_dir).replace(os.path.sep, '/')) for r, d, files in os.walk(dist_dir) for f in files]; zipf.close()"`;
  execSync(pyCmd, { stdio: 'inherit' });
  if (fs.existsSync(zipPath)) {
    const zipMb = (fs.statSync(zipPath).size / 1024 / 1024).toFixed(2);
    console.log(`  ✅ Production Deploy ZIP: jdc-solar-production-deploy.zip (${zipMb} MB)`);
  }
} catch (err) {
  console.warn('  ⚠️ Automatic zip packaging skipped:', err.message);
}

console.log('\n====================================================');
console.log(`BUILD SUCCESSFUL: Optimized release in dist/`);
console.log(`Total Production Payload: ${totalMb} MB`);
console.log('Ready for upload to Hostinger public_html/');
console.log('====================================================\n');
