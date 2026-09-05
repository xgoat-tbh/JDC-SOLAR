import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let targetDirName = '../frontend';
if (process.argv[2] === 'dist_astro' || process.env.SERVE_DIR === 'dist_astro') {
  targetDirName = '../dist_astro';
} else if (process.argv[2] === 'dist' || process.env.SERVE_DIR === 'dist') {
  targetDirName = '../dist';
}
const ROOT_DIR = path.resolve(__dirname, targetDirName);
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  req.on('error', () => {});
  res.on('error', () => {});

  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(ROOT_DIR, reqPath);

  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  let ext = path.extname(filePath).toLowerCase();

  // Transparent fallback: if .jpg/.jpeg does not exist, check if .webp exists
  if (!fs.existsSync(filePath) && (ext === '.jpg' || ext === '.jpeg')) {
    const webpPath = filePath.replace(/\.(jpg|jpeg)$/i, '.webp');
    if (fs.existsSync(webpPath)) {
      filePath = webpPath;
      ext = '.webp';
    }
  }

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

  const stat = fs.statSync(filePath);
  const etag = `W/"${stat.size}-${Math.floor(stat.mtimeMs)}"`;

  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304);
    res.end();
    return;
  }

  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Production-grade cache-control headers matching Apache .htaccess
  let cacheControl = 'no-cache, must-revalidate';
  if (['.woff2', '.webp', '.avif', '.png', '.jpg', '.jpeg', '.svg', '.ico'].includes(ext)) {
    cacheControl = 'public, max-age=31536000, immutable';
  } else if (['.css', '.js'].includes(ext)) {
    cacheControl = 'public, max-age=604800, stale-while-revalidate=86400';
  }

  const headers = {
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': cacheControl,
    'ETag': etag,
    'Vary': 'Accept-Encoding'
  };

  const acceptEncoding = req.headers['accept-encoding'] || '';
  const isCompressible = ['.html', '.css', '.js', '.json', '.svg'].includes(ext);

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(500);
    }
    res.end();
  });

  if (isCompressible && acceptEncoding.includes('br')) {
    headers['Content-Encoding'] = 'br';
    res.writeHead(200, headers);
    const compress = zlib.createBrotliCompress();
    compress.on('error', () => res.end());
    stream.pipe(compress).pipe(res);
  } else if (isCompressible && acceptEncoding.includes('gzip')) {
    headers['Content-Encoding'] = 'gzip';
    res.writeHead(200, headers);
    const compress = zlib.createGzip();
    compress.on('error', () => res.end());
    stream.pipe(compress).pipe(res);
  } else {
    headers['Content-Length'] = stat.size;
    res.writeHead(200, headers);
    stream.pipe(res);
  }
});

server.on('clientError', (err, socket) => {
  if (err.code === 'ECONNRESET' || !socket.writable) return;
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 JDC Solar Server running at: http://localhost:${PORT}`);
  console.log(`📱 Mobile Network testing: http://192.168.1.6:${PORT}`);
  console.log(`📁 Serving directory: ${ROOT_DIR}`);
  console.log(`======================================================\n`);
});
