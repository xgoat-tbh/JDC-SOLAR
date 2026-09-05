import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function decodePng(buffer) {
  let pos = 8;
  const idatChunks = [];
  let width = 0, height = 0;

  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buffer.readUInt32BE(pos + 8);
      height = buffer.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      idatChunks.push(buffer.subarray(pos + 8, pos + 8 + length));
    }
    pos += 12 + length;
  }

  const inflated = zlib.inflateSync(Buffer.concat(idatChunks));
  const pixels = Buffer.alloc(width * height * 4);

  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  let inPos = 0;
  const prevRow = Buffer.alloc(stride);
  const currRow = Buffer.alloc(stride);

  for (let y = 0; y < height; y++) {
    const filterType = inflated[inPos++];
    for (let i = 0; i < stride; i++) {
      currRow[i] = inflated[inPos++];
    }

    
    for (let x = 0; x < stride; x++) {
      const a = x >= bytesPerPixel ? currRow[x - bytesPerPixel] : 0;
      const b = prevRow[x];
      const c = x >= bytesPerPixel ? prevRow[x - bytesPerPixel] : 0;

      if (filterType === 1) { 
        currRow[x] = (currRow[x] + a) & 0xFF;
      } else if (filterType === 2) { 
        currRow[x] = (currRow[x] + b) & 0xFF;
      } else if (filterType === 3) { 
        currRow[x] = (currRow[x] + Math.floor((a + b) / 2)) & 0xFF;
      } else if (filterType === 4) { 
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        else pr = c;
        currRow[x] = (currRow[x] + pr) & 0xFF;
      }
    }

    currRow.copy(pixels, y * stride);
    currRow.copy(prevRow);
  }

  return { width, height, data: pixels };
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcBuf = Buffer.alloc(4);
  const typeAndData = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([lenBuf, typeAndData, crcBuf]);
}

function encodePng(width, height, rgbaBuffer) {
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); 
  ihdr.writeUInt8(6, 9); 
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  const stride = width * 4;
  const rawRows = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    rawRows[y * (stride + 1)] = 0; 
    rgbaBuffer.copy(rawRows, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const idatData = zlib.deflateSync(rawRows, { level: 9 });
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', idatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

function resizeRgba(srcData, srcW, srcH, dstW, dstH) {
  const dst = Buffer.alloc(dstW * dstH * 4);
  for (let dy = 0; dy < dstH; dy++) {
    const sy = Math.floor((dy / dstH) * srcH);
    for (let dx = 0; dx < dstW; dx++) {
      const sx = Math.floor((dx / dstW) * srcW);
      const srcIdx = (sy * srcW + sx) * 4;
      const dstIdx = (dy * dstW + dx) * 4;
      dst[dstIdx] = srcData[srcIdx];
      dst[dstIdx + 1] = srcData[srcIdx + 1];
      dst[dstIdx + 2] = srcData[srcIdx + 2];
      dst[dstIdx + 3] = srcData[srcIdx + 3];
    }
  }
  return dst;
}

const inputPath = 'C:/Users/Outcast/.gemini/antigravity/brain/58f1ccba-d83c-4985-878b-d4d963786e81/.user_uploaded/media_1787836291229.png';
const rawBuf = fs.readFileSync(inputPath);
const img = decodePng(rawBuf);

console.log(`Original image decoded: ${img.width}x${img.height}`);

const cropX = 140;
const cropY = 80;
const cropW = 744;
const cropH = 744;

const cropped = Buffer.alloc(cropW * cropH * 4);

for (let cy = 0; cy < cropH; cy++) {
  const sy = cropY + cy;
  for (let cx = 0; cx < cropW; cx++) {
    const sx = cropX + cx;
    const sIdx = (sy * img.width + sx) * 4;
    const cIdx = (cy * cropW + cx) * 4;

    const r = img.data[sIdx];
    const g = img.data[sIdx + 1];
    const b = img.data[sIdx + 2];

    
    
    const brightness = (r + g + b) / 3;
    const isWhite = (r > 245 && g > 245 && b > 245);

    if (isWhite) {
      
      cropped[cIdx] = 0;
      cropped[cIdx + 1] = 0;
      cropped[cIdx + 2] = 0;
      cropped[cIdx + 3] = 0;
    } else if (brightness > 220 && (r > 220 && g > 220 && b > 220)) {
      
      const alpha = Math.max(0, Math.min(255, Math.floor((255 - brightness) * 7.5)));
      cropped[cIdx] = r;
      cropped[cIdx + 1] = g;
      cropped[cIdx + 2] = b;
      cropped[cIdx + 3] = alpha;
    } else {
      
      cropped[cIdx] = r;
      cropped[cIdx + 1] = g;
      cropped[cIdx + 2] = b;
      cropped[cIdx + 3] = 255;
    }
  }
}

const emblem512 = resizeRgba(cropped, cropW, cropH, 512, 512);
const png512 = encodePng(512, 512, emblem512);

const touch180 = resizeRgba(cropped, cropW, cropH, 180, 180);
const png180 = encodePng(180, 180, touch180);

const fav32 = resizeRgba(cropped, cropW, cropH, 32, 32);
const png32 = encodePng(32, 32, fav32);

const brandDir = path.resolve(__dirname, '../frontend/assets/brand');
const imgBrandDir = path.resolve(__dirname, '../frontend/assets/images/brand');

fs.mkdirSync(brandDir, { recursive: true });
fs.mkdirSync(imgBrandDir, { recursive: true });

fs.writeFileSync(path.join(brandDir, 'logo-mark.png'), png512);
fs.writeFileSync(path.join(imgBrandDir, 'logo.png'), png512);
fs.writeFileSync(path.join(brandDir, 'apple-touch-icon.png'), png180);
fs.writeFileSync(path.join(brandDir, 'favicon-32x32.png'), png32);

console.log('✅ Transparent logo-mark.png (512x512) generated.');
console.log('✅ Transparent apple-touch-icon.png (180x180) generated.');
console.log('✅ Transparent favicon-32x32.png (32x32) generated.');
