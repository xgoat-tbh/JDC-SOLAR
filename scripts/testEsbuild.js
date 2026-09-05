import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';

const outdir = path.resolve('scratch/esm-test');
if (!fs.existsSync(outdir)) fs.mkdirSync(outdir, { recursive: true });

try {
  const res = await esbuild.build({
    entryPoints: ['frontend/js/main.js'],
    bundle: true,
    minify: true,
    format: 'esm',
    splitting: true,
    target: ['es2020'],
    outdir,
    treeShaking: true,
  });
  console.log('Build succeeded:', fs.readdirSync(outdir));
  for (const f of fs.readdirSync(outdir)) {
    const size = fs.statSync(path.join(outdir, f)).size;
    console.log(f.padEnd(25), (size / 1024).toFixed(1) + ' KB');
  }
} catch (e) {
  console.error('Build error:', e);
}
