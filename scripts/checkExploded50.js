import { launchBrowser } from './auditMobilePerformance.js';
import fs from 'fs';

const browser = await launchBrowser();
try {
  const PORT = 9222;
  const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
  const tabData = await newTabRes.json();
  const ws = new WebSocket(tabData.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.id && callbacks.has(msg.id)) {
      const { resolve, reject } = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const currentId = id++;
      callbacks.set(currentId, { resolve, reject });
      ws.send(JSON.stringify({ id: currentId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('engineering');
      if (window.__lenis) window.__lenis.scrollTo(el, { immediate: true });
      else el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  // Set slider to 50%
  await send('Runtime.evaluate', {
    expression: `(() => {
      const container = document.querySelector('[data-exploded-module]');
      const fill = document.getElementById('exploded-slider-fill');
      const thumb = document.getElementById('exploded-slider-thumb');
      const val = document.getElementById('exploded-separation-val');
      const track = document.getElementById('exploded-slider-track');
      
      container.style.setProperty('--exploded-sep', '0.500');
      fill.style.transform = 'scaleX(0.500)';
      thumb.style.left = '50%';
      track.setAttribute('aria-valuenow', '50');
      val.textContent = '50%';
    })()`
  });
  await new Promise(r => setTimeout(r, 500));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/exploded_at_50_pct.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved scratch/exploded_at_50_pct.png');

  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
} finally {
  browser.kill();
}
