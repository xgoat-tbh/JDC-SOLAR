/**
 * JDC SOLAR 2.0 - LOCAL DEVELOPMENT STATIC SERVER
 * Zero-dependency native Node.js HTTP server supporting clean URLs and MIME types
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../frontend');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(ROOT_DIR, reqPath);

  // Check if file exists; if not, check if adding .html resolves it (clean URLs)
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // Check if directory index exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Handle 404
  if (!fs.existsSync(filePath)) {
    filePath = path.join(ROOT_DIR, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    if (fs.existsSync(filePath)) {
      res.end(fs.readFileSync(filePath));
    } else {
      res.end('<h1>404 Not Found</h1>');
    }
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Origin': '*'
  });

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 JDC Solar 2.0 Dev Server running at: http://localhost:${PORT}`);
  console.log(`📁 Serving directory: ${ROOT_DIR}`);
  console.log(`======================================================\n`);
});
