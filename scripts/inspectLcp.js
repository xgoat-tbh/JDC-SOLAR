import { launchBrowser } from './auditMobilePerformance.js';

const browser = await launchBrowser();
try {
  const PORT = 9222;
  const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:3000/`, { method: 'PUT' });
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
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__lcpData = { lcp: 0, element: '', count: 0, entries: [] };
      try {
        const po = new PerformanceObserver((list) => {
          window.__lcpData.count += list.getEntries().length;
          for (const entry of list.getEntries()) {
            window.__lcpData.lcp = Math.round(entry.startTime);
            window.__lcpData.element = entry.element ? entry.element.tagName : '';
            window.__lcpData.entries.push({
              startTime: Math.round(entry.startTime),
              size: entry.size,
              tagName: entry.element ? entry.element.tagName : null,
              id: entry.id,
              url: entry.url
            });
          }
        });
        po.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        window.__lcpData.error = e.message;
      }
    `
  });
  await send('Page.bringToFront');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 4000));
  await send('Page.captureScreenshot');

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      return {
        visibilityState: document.visibilityState,
        hasFocus: document.hasFocus(),
        lcpData: window.__lcpData,
        paints: performance.getEntriesByType('paint').map(p => ({ name: p.name, startTime: Math.round(p.startTime) }))
      };
    })()`,
    returnByValue: true
  });
  console.log(JSON.stringify(res.result.value, null, 2));
  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
} finally {
  browser.kill();
}
