import React, { useEffect, useState } from 'react';

const PHRASES = [
  'WEBSITES.',
  'SYSTEMS.',
  'STORES.',
  'TOOLS.',
  'EXPERIMENTS.',
  'THINGS THAT WORK.',
];

export const TypingText: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        // Typing speed between 35ms and 60ms
        const delay = 35 + Math.random() * 25;
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, delay);
      } else {
        // Pause at end of word: 600ms (or indefinitely if on final phrase)
        if (phraseIndex === PHRASES.length - 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 3200); // hold longer on final phrase
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, 650);
        }
      }
    } else {
      // Deleting speed: 20ms
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 22);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(14px, 1.8vw, 24px)',
        color: '#E8E6DF',
        letterSpacing: '0.04em',
      }}
    >
      <span style={{ color: '#777777', marginRight: '8px' }}>WE DESIGN:</span>
      <span style={{ color: '#C7FF32', fontWeight: 700 }}>{currentText}</span>
      <span
        className="cursor-blink"
        style={{
          color: '#EC3D31',
          marginLeft: '2px',
          fontWeight: 900,
        }}
      >
        _
      </span>
    </div>
  );
};
