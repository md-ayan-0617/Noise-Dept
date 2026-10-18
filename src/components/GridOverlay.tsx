import React, { useEffect } from 'react';
import { useStudioStore } from '../store/useStudioStore';

export const GridOverlay: React.FC = () => {
  const { gridVisible, toggleGrid, setCursor } = useStudioStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'g' || e.key === 'G') {
        toggleGrid();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleGrid]);

  return (
    <>
      {/* 12-Column Grid Lines Overlay */}
      {gridVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            maxWidth: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 99990,
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(4px, 1.2vw, 16px)',
            padding: '0 var(--pad-section-x)',
            boxSizing: 'border-box',
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '100%',
                borderLeft: '1px solid rgba(236, 61, 49, 0.22)',
                borderRight: '1px solid rgba(236, 61, 49, 0.22)',
                backgroundColor: 'rgba(236, 61, 49, 0.02)',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '80px',
                  left: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'rgba(236, 61, 49, 0.5)',
                }}
              >
                C_{String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Floating [G] Grid Toggle Button in bottom right */}
      <button
        onClick={toggleGrid}
        title="Toggle 12-column layout grid (Press G)"
        style={{
          position: 'fixed',
          bottom: 'clamp(14px, 2vw, 24px)',
          right: 'clamp(14px, 2vw, 24px)',
          zIndex: 99995,
          background: gridVisible ? '#EC3D31' : 'rgba(11, 11, 11, 0.85)',
          color: gridVisible ? '#0B0B0B' : '#E8E6DF',
          border: '1px solid rgba(232, 230, 223, 0.2)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          padding: '6px 10px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={() => setCursor('default', 'GRID')}
        onMouseLeave={() => setCursor('default')}
      >
        [G] {gridVisible ? 'GRID ON' : 'GRID'}
      </button>
    </>
  );
};
