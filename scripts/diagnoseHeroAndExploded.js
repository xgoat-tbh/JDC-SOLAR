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
  await send('DOM.enable');
  await send('CSS.enable');

  // Desktop viewport: 1440 x 900
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2500));

  // Take screenshot of hero
  const heroScreenshot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
  });
  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/current_hero_1440.png', Buffer.from(heroScreenshot.data, 'base64'));
  console.log('Saved scratch/current_hero_1440.png');

  // Scroll to exploded section
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('engineering');
      if (el) el.scrollIntoView();
    })()`
  });
  await new Promise(r => setTimeout(r, 1500));

  const explodedMetrics = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('engineering');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const layers = Array.from(document.querySelectorAll('.exploded-layer')).map(l => {
        const cs = window.getComputedStyle(l);
        return {
          id: l.id,
          className: l.className,
          bgImage: cs.backgroundImage,
          opacity: cs.opacity,
          transform: cs.transform,
          width: cs.width,
          height: cs.height,
          display: cs.display,
          visibility: cs.visibility
        };
      });
      return {
        rect: { x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: rect.height },
        layers
      };
    })()`,
    returnByValue: true
  });
  console.log('Exploded info:', JSON.stringify(explodedMetrics.result.value, null, 2));

  // Screenshot exploded section
  const explodedScreenshot = await send('Page.captureScreenshot', {
    format: 'png'
  });
  fs.writeFileSync('scratch/current_exploded_viewport.png', Buffer.from(explodedScreenshot.data, 'base64'));
  console.log('Saved scratch/current_exploded_viewport.png');

  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
} finally {
  browser.kill();
}
