import React, { useEffect, useState, useRef } from 'react';
import { useStudioStore } from '../store/useStudioStore';

export const Preloader: React.FC = () => {
  const { preloaded, setPreloaded } = useStudioStore();
  const [binaryText, setBinaryText] = useState('0001');
  const [percent, setPercent] = useState(0);
  const [isTorn, setIsTorn] = useState(false);
  const loadingWordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preloaded) return;

    const sequences = ['0001', '0010', '0110', '1011', '1101', '100%'];
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step < sequences.length) {
        setBinaryText(sequences[step]);
        setPercent(Math.floor((step / (sequences.length - 1)) * 100));

        // Rapid width change on LOADING text
        if (loadingWordRef.current) {
          const randomWdth = 40 + Math.random() * 260;
          loadingWordRef.current.style.fontVariationSettings = `"wdth" ${randomWdth}, "wght" 800`;
        }
      } else {
        clearInterval(interval);
        setPercent(100);
        // Trigger vertical tear
        setIsTorn(true);
        setTimeout(() => {
          setPreloaded(true);
        }, 550);
      }
    }, 110);

    return () => clearInterval(interval);
  }, [preloaded, setPreloaded]);

  if (preloaded) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        pointerEvents: isTorn ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* Top Strip (tears up & left) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: '#0B0B0B',
          transition: 'transform 0.55s cubic-bezier(0.77, 0, 0.175, 1)',
          transform: isTorn ? 'translateY(-102%) skewX(-2deg)' : 'translateY(0) skewX(0)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '32px',
          boxSizing: 'border-box',
          borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777777', letterSpacing: '0.1em' }}>
          NOISE DEPT. // SYSTEM BOOT_2026
        </div>
      </div>

      {/* Bottom Strip (tears down & right) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          backgroundColor: '#0B0B0B',
          transition: 'transform 0.55s cubic-bezier(0.77, 0, 0.175, 1)',
          transform: isTorn ? 'translateY(102%) skewX(2deg)' : 'translateY(0) skewX(0)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '32px',
          boxSizing: 'border-box',
          borderTop: '1px solid rgba(232, 230, 223, 0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777777' }}>
          <span>BUFFER: ALLOCATED</span>
          <span>{percent}% COMPLETE</span>
        </div>
      </div>

      {/* Center Content (fades out on tear) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: isTorn ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        {/* Background Giant Variable LOADING Word */}
        <div
          ref={loadingWordRef}
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(90px, 16vw, 240px)',
            color: 'rgba(232, 230, 223, 0.05)',
            textTransform: 'uppercase',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            transition: 'font-variation-settings 0.1s ease',
          }}
        >
          LOADING
        </div>

        {/* Binary & Percent Display */}
        <div
          style={{
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#C7FF32',
              letterSpacing: '0.15em',
            }}
          >
            {binaryText}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#E8E6DF',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            INITIALIZING CONTROLLED DISORDER
          </div>
        </div>
      </div>
    </div>
  );
};
