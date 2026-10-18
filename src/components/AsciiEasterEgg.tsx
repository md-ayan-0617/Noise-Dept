import React, { useEffect, useState, useRef } from 'react';
import { useStudioStore } from '../store/useStudioStore';

export const AsciiEasterEgg: React.FC = () => {
  const { asciiActive, setAsciiActive } = useStudioStore();
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const inputBuffer = useRef('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs/textareas
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'Escape' && asciiActive) {
        setAsciiActive(false);
        document.body.classList.remove('ascii-mode');
        return;
      }

      // Check sequence 'noise'
      inputBuffer.current += e.key.toUpperCase();
      if (inputBuffer.current.length > 10) {
        inputBuffer.current = inputBuffer.current.slice(-10);
      }

      if (inputBuffer.current.includes('NOISE')) {
        inputBuffer.current = '';
        setAsciiActive(true);
        document.body.classList.add('ascii-mode');
        setSecondsRemaining(5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [asciiActive, setAsciiActive]);

  // Countdown timer for 5 seconds
  useEffect(() => {
    if (!asciiActive) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setAsciiActive(false);
          document.body.classList.remove('ascii-mode');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [asciiActive, setAsciiActive]);

  if (!asciiActive) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        backgroundColor: '#C7FF32',
        color: '#0B0B0B',
        padding: '6px 12px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(9px, 2.2vw, 11px)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        boxShadow: '0 4px 16px rgba(199, 255, 50, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '92vw',
        boxSizing: 'border-box',
      }}
    >
      <span>[ ASCII ACTIVE // 00{secondsRemaining}S // ESC TO EXIT ]</span>
      <button
        onClick={() => {
          setAsciiActive(false);
          document.body.classList.remove('ascii-mode');
        }}
        style={{
          background: 'none',
          border: 'none',
          color: '#0B0B0B',
          fontWeight: 900,
          cursor: 'pointer',
        }}
      >
        ✕
      </button>
    </div>
  );
};
