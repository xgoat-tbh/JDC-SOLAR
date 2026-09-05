import React, { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImg?: string;
  beforeAlt?: string;
  afterImg?: string;
  afterAlt?: string;
  savings?: string;
  warranty?: string;
  payback?: string;
}

export default function BeforeAfterSlider({
  beforeImg = '/assets/images/hero/rooftop-before.jpg',
  beforeAlt = 'Bare concrete rooftop before solar installation',
  afterImg = '/assets/images/hero/rooftop-after.jpg',
  afterAlt = 'Completed Tier-1 Monocrystalline Solar Installation on the exact same rooftop',
  savings = '₹28,470/yr',
  warranty = '25 Years',
  payback = '3.1 Yrs',
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let pct = (x / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    setSliderPos(Math.round(pct * 10) / 10);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <div className="before-after-wrapper">
      <div
        ref={containerRef}
        className={`before-after-container ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Before Layer (Bottom) */}
        <div className="before-after__layer before-after__layer--before">
          <img
            src={beforeImg}
            alt={beforeAlt}
            width={1080}
            height={540}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* After Layer (Top with clip-path) */}
        <div
          className="before-after__layer before-after__layer--after"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <img
            src={afterImg}
            alt={afterAlt}
            width={1080}
            height={540}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Labels */}
        <span className="before-after__label before-after__label--before">BEFORE</span>
        <span className="before-after__label before-after__label--after">AFTER</span>

        {/* Handle Divider & Draggable Button */}
        <div className="before-after__handle" style={{ left: `${sliderPos}%` }}>
          <button
            type="button"
            className="before-after__handle-button"
            aria-label="Drag slider to compare before and after solar installation"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            onKeyDown={handleKeyDown}
          >
            <span className="before-after__handle-arrows">
              <svg className="w-3.5 h-3.5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <svg className="w-3.5 h-3.5 -rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Verified Stats Footer */}
      <div className="before-after-footer">
        <div className="before-after-footer__stat">
          <span className="before-after-footer__stat-val">{savings}</span>
          <span className="before-after-footer__stat-lbl">Savings</span>
        </div>
        <div className="before-after-footer__divider"></div>
        <div className="before-after-footer__stat">
          <span className="before-after-footer__stat-val">{warranty}</span>
          <span className="before-after-footer__stat-lbl">Warranty</span>
        </div>
        <div className="before-after-footer__divider"></div>
        <div className="before-after-footer__stat">
          <span className="before-after-footer__stat-val">{payback}</span>
          <span className="before-after-footer__stat-lbl">Payback</span>
        </div>
      </div>
    </div>
  );
}
