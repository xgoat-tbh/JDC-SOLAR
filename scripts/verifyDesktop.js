import { launchBrowser } from './auditMobilePerformance.js';

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
  await send('Network.enable');
  await send('Runtime.enable');

  // Desktop viewport: 1440 x 900, deviceScaleFactor 1, mobile: false
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Emulation.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  await send('Emulation.setTouchEmulationEnabled', { enabled: false });

  const resources = [];
  ws.addEventListener('message', (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.method === 'Network.responseReceived') {
      resources.push(msg.params.response.url);
    }
  });

  await send('Page.bringToFront');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 3000));

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      return {
        innerWidth: window.innerWidth,
        hasLenis: !!window.__lenis,
        isRealLenis: typeof window.__lenis?.raf === 'function',
        scrollPos: window.scrollY
      };
    })()`,
    returnByValue: true
  });

  console.log('Desktop Evaluation Result:', JSON.stringify(evalRes.result.value, null, 2));
  console.log('Lenis Chunk Loaded:', resources.some(r => r.includes('lenis-')));

  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
} finally {
  browser.kill();
}
