import React, { useEffect, useRef, useState } from 'react';
import { useStudioStore } from '../store/useStudioStore';

export const Cursor: React.FC = () => {
  const { cursorState, cursorText, previewImage } = useStudioStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });
  const previewPos = useRef({ x: -100, y: -100 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setReducedMotion(true);
      return;
    }

    // Touch device detection (fine pointer only)
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    if (touchQuery.matches) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3.5}px, ${e.clientY - 3.5}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let rafId: number;
    const animate = () => {
      // Calculate velocity for outline rotation
      const vx = mousePos.current.x - lastMousePos.current.x;
      lastMousePos.current = { x: mousePos.current.x, y: mousePos.current.y };

      // Target rotation clamped between -12 and 12 deg
      const targetRot = Math.max(-12, Math.min(12, vx * 0.85));
      rotation.current += (targetRot - rotation.current) * 0.15;

      // Lerp outline position
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * 0.22;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * 0.22;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${outlinePos.current.x - 17}px, ${outlinePos.current.y - 17}px, 0) rotate(${rotation.current}deg)`;
      }

      // Lerp preview image position if active
      if (previewRef.current) {
        previewPos.current.x += (mousePos.current.x - previewPos.current.x) * 0.14;
        previewPos.current.y += (mousePos.current.y - previewPos.current.y) * 0.14;
        previewRef.current.style.transform = `translate3d(${previewPos.current.x + 28}px, ${previewPos.current.y - 75}px, 0) rotate(${rotation.current * 0.4}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouch || reducedMotion) return null;

  const hasLabel = cursorText || cursorState !== 'default';
  const labelText = cursorText || (
    cursorState === 'open' ? 'OPEN' :
    cursorState === 'view' ? 'VIEW' :
    cursorState === 'drag' ? 'DRAG' :
    cursorState === 'play' ? 'PLAY' :
    cursorState === 'out' ? 'OUT ↗' :
    cursorState === 'start' ? 'START' :
    cursorState === 'break' ? 'BREAK IT' :
    cursorState === 'lost' ? 'LOST' : ''
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
      aria-hidden="true"
    >
      {/* 7px Signal Red Square Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '7px',
          height: '7px',
          backgroundColor: '#EC3D31',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* 34px Lagged Square Outline with Velocity Rotation */}
      <div
        ref={outlineRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '34px',
          height: '34px',
          border: '1px solid rgba(236, 61, 49, 0.85)',
          pointerEvents: 'none',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.2s ease',
          backgroundColor: hasLabel ? 'rgba(11, 11, 11, 0.7)' : 'transparent',
        }}
      >
        {hasLabel && (
          <span
            style={{
              position: 'absolute',
              top: '38px',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: '#0B0B0B',
              backgroundColor: '#EC3D31',
              padding: '2px 6px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {labelText}
          </span>
        )}
      </div>

      {/* Floating Image Preview on Hover Mode (Desktop only) */}
      {previewImage && typeof window !== 'undefined' && window.innerWidth >= 1024 && (
        <div
          ref={previewRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '220px',
            height: '150px',
            pointerEvents: 'none',
            border: '2px solid #EC3D31',
            backgroundColor: '#111111',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            willChange: 'transform',
          }}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%) contrast(120%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              left: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              color: '#fff',
              backgroundColor: '#EC3D31',
              padding: '1px 4px',
            }}
          >
            PREVIEW // REF
          </div>
        </div>
      )}
    </div>
  );
};
