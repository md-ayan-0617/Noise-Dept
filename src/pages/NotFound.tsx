import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';

export const NotFound: React.FC = () => {
  const { setCursor } = useStudioStore();

  useEffect(() => {
    setCursor('lost', 'LOST');
    return () => setCursor('default');
  }, [setCursor]);

  return (
    <div
      style={{
        backgroundColor: '#0B0B0B',
        color: '#E8E6DF',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background Repeated 404 Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(90px, 24vw, 380px)',
          fontWeight: 900,
          color: 'rgba(232, 230, 223, 0.04)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        404404404404
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#EC3D31', letterSpacing: '0.2em', marginBottom: '16px' }}>
          // ERROR 404: DEAD END MEMORY NODE
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 9vw, 130px)',
            fontWeight: 900,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: '0 0 24px 0',
          }}
        >
          YOU FOUND <br />
          <span style={{ color: '#C7FF32' }}>NOTHING.</span>
        </h1>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#888', marginBottom: '40px' }}>
          Impressive, honestly. This coordinate has zero allocated buffers or was discarded during our last cleanup sprint.
        </p>

        <Link
          to="/"
          className="btn-raw-solid"
          style={{
            backgroundColor: '#C7FF32',
            color: '#0B0B0B',
            borderColor: '#C7FF32',
          }}
          onMouseEnter={() => setCursor('default')}
        >
          BACK TO SOMETHING →
        </Link>
      </div>
    </div>
  );
};
