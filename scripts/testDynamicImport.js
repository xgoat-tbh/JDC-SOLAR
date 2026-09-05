import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';

const testEntry = path.resolve('scratch/test-entry.js');
fs.writeFileSync(testEntry, `
export async function test() {
  if (window.innerWidth >= 1024) {
    const { default: Lenis } = await import('lenis');
    new Lenis();
  }
}
test();
`);

const outdir = path.resolve('scratch/esm-test2');
if (!fs.existsSync(outdir)) fs.mkdirSync(outdir, { recursive: true });

try {
  const res = await esbuild.build({
    entryPoints: [testEntry],
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
