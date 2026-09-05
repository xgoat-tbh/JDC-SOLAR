import { spawn } from 'child_process';
import http from 'http';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9222;

export async function launchBrowser() {
  const proc = spawn(EDGE_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--window-size=393,851',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--run-all-compositor-stages-before-draw',
    '--user-data-dir=' + process.env.TEMP + '\\edge-perf-profile'
  ], { detached: false });

  // Wait for remote debugging to be ready
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return proc;
    } catch {}
    await new Promise(r => setTimeout(r, 200));
  }
  throw new Error('Failed to connect to Edge CDP');
}

export async function auditUrl(targetUrl, options = {}) {
  const browser = await launchBrowser();

  try {
    const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
    const tabData = await newTabRes.json();
    const wsUrl = tabData.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
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

    // Enable domains
    await send('Network.enable');
    await send('Page.enable');
    await send('Performance.enable');
    await send('Network.setCacheDisabled', { cacheDisabled: true });

    // Register LCP observer before navigation
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        window.__lcpData = { lcp: 0, lcpElement: '' };
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            if (entries.length) {
              const last = entries[entries.length - 1];
              window.__lcpData.lcp = Math.round(last.startTime);
              window.__lcpData.lcpElement = last.element ? (last.element.tagName + (last.element.className ? '.' + String(last.element.className).split(' ').join('.') : '')) : '';
            }
          }).observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {}
      `
    });

    // Emulate Mobile Device (Moto G4 / Pixel 5 - 393 x 851, DPR 2.75)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 393,
      height: 851,
      deviceScaleFactor: 2.75,
      mobile: true,
      screenOrientation: { angle: 0, type: 'portraitPrimary' }
    });

    await send('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
    });

    await send('Emulation.setTouchEmulationEnabled', {
      enabled: true,
      maxTouchPoints: 5
    });

    await send('Page.bringToFront');

    // 4x CPU Throttling (Simulate Mid-tier Mobile SoC)
    if (options.cpuThrottling !== false) {
      await send('Emulation.setCPUThrottlingRate', { rate: 4 });
    }

    // Fast 4G Network Emulation if requested
    if (options.throttleNetwork) {
      await send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 150, // 150ms RTT
        downloadThroughput: 1.6 * 1024 * 1024 / 8, // 1.6 Mbps
        uploadThroughput: 750 * 1024 / 8 // 750 Kbps
      });
    }

    // Track network requests and total transfer size
    const requests = [];
    let totalEncodedSize = 0;

    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Network.responseReceived') {
        requests.push({
          url: msg.params.response.url,
          mimeType: msg.params.response.mimeType,
          status: msg.params.response.status
        });
      }
      if (msg.method === 'Network.loadingFinished') {
        totalEncodedSize += msg.params.encodedDataLength || 0;
      }
    });

    // Navigate and wait
    await send('Page.navigate', { url: targetUrl });

    // Wait for load event
    await new Promise((resolve) => {
      const onMsg = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.method === 'Page.loadEventFired') {
          ws.removeEventListener('message', onMsg);
          resolve();
        }
      };
      ws.addEventListener('message', onMsg);
      setTimeout(resolve, 8000); // 8s safety timeout
    });

    // Wait for idle/render settlement
    await new Promise(r => setTimeout(r, 2000));

    // Gather Web Vitals and Performance Metrics from page runtime
    const evalResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const perf = performance.getEntriesByType('navigation')[0] || {};
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
        
        let lcp = window.__lcpData?.lcp || 0;
        let lcpElement = window.__lcpData?.lcpElement || '';
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries.length) {
          const last = lcpEntries[lcpEntries.length - 1];
          lcp = Math.round(last.startTime);
          lcpElement = last.element ? (last.element.tagName + (last.element.className ? '.' + String(last.element.className).split(' ').join('.') : '')) : lcpElement;
        }

        let cls = 0;
        for (const entry of performance.getEntriesByType('layout-shift')) {
          if (!entry.hadRecentInput) cls += entry.value;
        }

        let longTaskDuration = 0;
        let longTaskCount = 0;
        for (const entry of performance.getEntriesByType('longtask')) {
          longTaskDuration += entry.duration;
          longTaskCount++;
        }

        const resources = performance.getEntriesByType('resource').map(r => ({
          name: r.name.split('/').pop().split('?')[0] || r.name,
          initiatorType: r.initiatorType,
          duration: Math.round(r.duration),
          transferSize: r.transferSize
        }));

        return {
          fcp: Math.round(fcp),
          lcp: Math.round(lcp),
          lcpElement,
          cls: Number(cls.toFixed(4)),
          domContentLoaded: Math.round(perf.domContentLoadedEventEnd || 0),
          load: Math.round(perf.loadEventEnd || 0),
          longTaskDuration: Math.round(longTaskDuration),
          longTaskCount,
          resourceCount: resources.length,
          resources
        };
      })()`,
      returnByValue: true
    });

    const metricsResult = await send('Performance.getMetrics');
    const metricsMap = {};
    metricsResult.metrics.forEach(m => metricsMap[m.name] = m.value);

    ws.close();
    await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);

    return {
      vitals: evalResult.result.value,
      cdpMetrics: {
        LayoutCount: metricsMap['LayoutCount'],
        RecalcStyleCount: metricsMap['RecalcStyleCount'],
        LayoutDuration: (metricsMap['LayoutDuration'] * 1000).toFixed(1) + 'ms',
        RecalcStyleDuration: (metricsMap['RecalcStyleDuration'] * 1000).toFixed(1) + 'ms',
        ScriptDuration: (metricsMap['ScriptDuration'] * 1000).toFixed(1) + 'ms',
        TaskDuration: (metricsMap['TaskDuration'] * 1000).toFixed(1) + 'ms',
        JSHeapUsedSize: ((metricsMap['JSHeapUsedSize'] || 0) / 1024 / 1024).toFixed(2) + 'MB'
      },
      requests: requests.length,
      totalEncodedSizeKb: Math.round(totalEncodedSize / 1024)
    };
  } finally {
    try { browser.kill(); } catch {}
  }
}

// CLI direct run
if (process.argv[1].endsWith('auditMobilePerformance.js')) {
  const url = process.argv[2] || 'http://localhost:3000/';
  console.log(`Auditing Mobile Performance on ${url} (4x CPU throttling, Moto G4/Pixel 5 viewport)...`);
  const results = await auditUrl(url);
  console.log(JSON.stringify(results, null, 2));
}
