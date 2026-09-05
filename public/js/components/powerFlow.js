import { qs, qsa } from '../core/dom.js';

const MODES = {
  midday: {
    solar: '4.5 kW',
    solarStatus: 'Peak 100% Generation',
    home: '1.5 kW',
    homeStatus: '100% Solar Powered',
    grid: '+3.0 kW',
    gridStatus: 'Exporting to JBVNL / TSUISL',
    solarToInverter: true,
    inverterToHome: true,
    inverterToGrid: true,
    gridReverse: false
  },
  morning: {
    solar: '2.0 kW',
    solarStatus: '45% Diffused Generation',
    home: '1.2 kW',
    homeStatus: '100% Solar Powered',
    grid: '+0.8 kW',
    gridStatus: 'Net Meter Surplus',
    solarToInverter: true,
    inverterToHome: true,
    inverterToGrid: true,
    gridReverse: false
  },
  night: {
    solar: '0.0 kW',
    solarStatus: 'Standby / Zero Generation',
    home: '1.8 kW',
    homeStatus: 'Grid Powered',
    grid: '-1.8 kW',
    gridStatus: 'Importing from DISCOM Grid',
    solarToInverter: false,
    inverterToHome: false,
    inverterToGrid: true,
    gridReverse: true
  }
};

export function initPowerFlowSimulator() {
  const container = qs('[data-power-flow]');
  if (!container) return;

  const modeBtns = qsa('.power-flow-mode-btn', container);
  const outSolar = qs('#pf-solar-val', container);
  const outSolarStatus = qs('#pf-solar-status', container);
  const outHome = qs('#pf-home-val', container);
  const outHomeStatus = qs('#pf-home-status', container);
  const outGrid = qs('#pf-grid-val', container);
  const outGridStatus = qs('#pf-grid-status', container);

  const wireSolar = qs('#wire-solar-inverter', container);
  const wireInverterHome = qs('#wire-inverter-home', container);
  const wireInverterGrid = qs('#wire-inverter-grid', container);

  function setMode(modeKey) {
    const data = MODES[modeKey];
    if (!data) return;

    modeBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-mode') === modeKey);
    });

    if (outSolar) outSolar.textContent = data.solar;
    if (outSolarStatus) outSolarStatus.textContent = data.solarStatus;
    if (outHome) outHome.textContent = data.home;
    if (outHomeStatus) outHomeStatus.textContent = data.homeStatus;
    if (outGrid) outGrid.textContent = data.grid;
    if (outGridStatus) {
      outGridStatus.textContent = data.gridStatus;
      outGridStatus.style.color = data.grid.startsWith('+') ? '#10B981' : '#F59E0B';
    }

    if (wireSolar) {
      wireSolar.style.stroke = data.solarToInverter ? '#FD8127' : '#94A3B8';
      wireSolar.style.animationPlayState = data.solarToInverter ? 'running' : 'paused';
    }

    if (wireInverterHome) {
      wireInverterHome.style.stroke = '#10B981';
      wireInverterHome.style.animationPlayState = 'running';
    }

    if (wireInverterGrid) {
      wireInverterGrid.style.stroke = data.gridReverse ? '#F59E0B' : '#10B981';
      wireInverterGrid.classList.toggle('flow-wire--reverse', data.gridReverse);
    }
  }

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      setMode(mode);
    });
  });

  
  setMode('midday');
}
