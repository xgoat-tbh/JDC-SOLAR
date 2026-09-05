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
  await send('Emulation.setDeviceMetricsOverride', { width: 393, height: 852, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));

  await send('Runtime.evaluate', {
    expression: 'document.getElementById("engineering").scrollIntoView();'
  });
  await new Promise(r => setTimeout(r, 1000));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/current_exploded_mobile_noclipping.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved scratch/current_exploded_mobile_noclipping.png');

  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
} finally {
  browser.kill();
}
