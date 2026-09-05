import React, { useState } from 'react';

interface LayerSpec {
  id: string;
  num: string;
  title: string;
  desc: string;
  dist: number;
  pop: number;
  bgSvg: string;
}

const LAYERS: LayerSpec[] = [
  {
    id: 'layer-glass',
    num: '01',
    title: '3.2mm Low-Iron Tempered Glass',
    desc: '94.5% optical transmittance with hail-impact resistance rating up to 25mm ice pellets at 82 km/h.',
    dist: 140,
    pop: 75,
    bgSvg: '/assets/images/exploded/layer-glass.svg',
  },
  {
    id: 'layer-coating',
    num: '02',
    title: 'Nano Anti-Reflective (AR) Coating',
    desc: 'Reduces sunlight bounce-off and maximizes photon capture during early morning and late evening low-angle light.',
    dist: 85,
    pop: 55,
    bgSvg: '/assets/images/exploded/layer-coating.svg',
  },
  {
    id: 'layer-cells',
    num: '03',
    title: 'M10 Tier-1 Monocrystalline Cells (16BB)',
    desc: 'Ultra-pure silicon with 16 busbar ribbons minimizing resistance loss and delivering 22.4% cell efficiency.',
    dist: 30,
    pop: 45,
    bgSvg: '/assets/images/exploded/layer-cells.svg',
  },
  {
    id: 'layer-eva',
    num: '04',
    title: 'Dual-Layer Cross-Linked EVA Encapsulant',
    desc: 'Hermetic sealing preventing moisture penetration, PID degradation, and corrosion in Eastern India\'s monsoon climate.',
    dist: -35,
    pop: -45,
    bgSvg: '/assets/images/exploded/layer-eva.svg',
  },
  {
    id: 'layer-frame',
    num: '05',
    title: 'Anodized Aerospace-Grade Aluminum Frame',
    desc: 'Corrosion-proof 35mm structural frame engineered to withstand 5400 Pa snow load and 2400 Pa cyclone wind shear.',
    dist: -95,
    pop: -75,
    bgSvg: '/assets/images/exploded/layer-frame.svg',
  },
];

export default function ExplodedModule() {
  const [separation, setSeparation] = useState(50);
  const [activeLayer, setActiveLayer] = useState('layer-glass');

  const sepFraction = separation / 100;

  return (
    <div className="exploded-module-wrapper">
      <div className="exploded-module-grid">
        {/* 3D Viewport Scene */}
        <div className="exploded-viewport">
          <div className="exploded-scene">
            {LAYERS.map((layer) => {
              const isInspected = activeLayer === layer.id;
              const popOffset = isInspected && separation <= 35 ? layer.pop : 0;
              const zVal = sepFraction * layer.dist + popOffset;

              return (
                <div
                  key={layer.id}
                  id={layer.id}
                  title={layer.title}
                  className={`exploded-layer ${isInspected ? 'is-inspected' : ''}`}
                  style={{
                    backgroundImage: `url('${layer.bgSvg}')`,
                    transform: `translateZ(${zVal}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Controls & Layer Descriptions */}
        <div>
          <div className="exploded-specs-list" role="list">
            {LAYERS.map((layer) => {
              const isActive = activeLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  role="listitem"
                  tabIndex={0}
                  className={`exploded-spec-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveLayer(layer.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLayer(layer.id);
                    }
                  }}
                >
                  <div className="exploded-spec-card__num">{layer.num}</div>
                  <div className="exploded-spec-card__content">
                    <div className="exploded-spec-card__title">{layer.title}</div>
                    <div className="exploded-spec-card__desc">{layer.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Separation Slider */}
          <div className="exploded-controls">
            <span className="exploded-controls__label">
              <svg className="w-4 h-4 text-brand-accent inline-block mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Explode 3D Layers
            </span>
            <div className="flex-grow relative flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={separation}
                onChange={(e) => setSeparation(Number(e.target.value))}
                aria-label="Explode 3D solar layers separation"
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent focus:outline-none"
              />
            </div>
            <span className="exploded-controls__val font-heading font-extrabold text-brand-accent min-w-[42px] text-right">
              {separation}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
