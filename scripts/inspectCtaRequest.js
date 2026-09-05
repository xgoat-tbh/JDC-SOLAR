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
  await new Promise(r => setTimeout(r, 2000));

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const elCinematic = document.querySelector('.cta-banner--cinematic');
      const rules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && elCinematic.matches(rule.selectorText) && rule.style.backgroundImage) {
              rules.push({ selector: rule.selectorText, bg: rule.style.backgroundImage });
            }
            if (rule.cssRules) {
              for (const subRule of rule.cssRules) {
                if (subRule.selectorText && elCinematic.matches(subRule.selectorText) && subRule.style.backgroundImage) {
                  rules.push({ media: rule.conditionText || rule.media?.mediaText, selector: subRule.selectorText, bg: subRule.style.backgroundImage });
                }
              }
            }
          }
        } catch(e) {}
      }
      return rules;
    })()`,
    returnByValue: true
  });
  console.log('Matching rules with bg:', JSON.stringify(res.result.value, null, 2));
  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
} finally {
  browser.kill();
}
