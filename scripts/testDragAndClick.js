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
  await send('Runtime.enable');

  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));

  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('engineering');
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { immediate: true });
        } else {
          el.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
      }
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  // Get track position within viewport
  const trackInfo = await send('Runtime.evaluate', {
    expression: `(() => {
      const track = document.getElementById('exploded-slider-track');
      const thumb = document.getElementById('exploded-slider-thumb');
      const val = document.getElementById('exploded-separation-val');
      const rect = track.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
        inViewport: rect.top >= 0 && rect.bottom <= window.innerHeight,
        initialVal: val.textContent
      };
    })()`,
    returnByValue: true
  });
  console.log('Track info:', trackInfo.result.value);

  const { left, top, width } = trackInfo.result.value;

  // Mouse move to thumb
  const startX = left + width * 0.85;
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: Math.round(startX), y: Math.round(top) });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: Math.round(startX), y: Math.round(top), button: 'left', clickCount: 1 });

  // Drag to 30%
  const targetX = left + width * 0.3;
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: Math.round(targetX), y: Math.round(top), button: 'left' });
  await new Promise(r => setTimeout(r, 200));
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: Math.round(targetX), y: Math.round(top), button: 'left' });
  await new Promise(r => setTimeout(r, 500));

  const afterDrag = await send('Runtime.evaluate', {
    expression: `(() => {
      const val = document.getElementById('exploded-separation-val');
      const container = document.querySelector('[data-exploded-module]');
      return {
        val: val.textContent,
        sepVar: container.style.getPropertyValue('--exploded-sep')
      };
    })()`,
    returnByValue: true
  });
  console.log('After drag:', afterDrag.result.value);

  // Test clicking card 03
  await send('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelector('[data-layer-target="layer-cells"]');
      card.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 300));

  const afterClickCard = await send('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelector('[data-layer-target="layer-cells"]');
      const layer = document.getElementById('layer-cells');
      return {
        cardActive: card.classList.contains('is-active'),
        layerInspected: layer.classList.contains('is-inspected')
      };
    })()`,
    returnByValue: true
  });
  console.log('After clicking card 03:', afterClickCard.result.value);

  ws.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
} finally {
  browser.kill();
}
