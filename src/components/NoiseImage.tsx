import React, { useState } from 'react';
import { generateGraphicFallback } from '../utils/imageFallback';

interface NoiseImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  accentColor?: string;
  scanlineOnHover?: boolean;
  grayscaleByDefault?: boolean;
}

export const NoiseImage: React.FC<NoiseImageProps> = ({
  src,
  alt = 'Noise Dept Visual',
  fallbackTitle = 'NOISE DEPT',
  fallbackSubtitle = 'GRAPHIC ARCHIVE',
  accentColor = '#EC3D31',
  scanlineOnHover = true,
  grayscaleByDefault = true,
  className = '',
  style,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const fallbackSrc = generateGraphicFallback(fallbackTitle, fallbackSubtitle, accentColor);
  const finalSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: '#151515',
        position: 'relative',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: grayscaleByDefault && !isHovered ? 'grayscale(100%) contrast(115%)' : 'grayscale(0%) contrast(100%)',
          transition: 'filter 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
          opacity: isLoaded || hasError ? 1 : 0.3,
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          willChange: 'filter, transform',
        }}
        {...props}
      />

      {/* Industrial Photocopy Scanline on Hover (using global CSS animation) */}
      {scanlineOnHover && isHovered && (
        <div
          className="scanline-hover-travel"
          style={{
            boxShadow: `0 0 16px 2px ${accentColor}`,
          }}
        />
      )}

      {/* Subtle photocopy grain tag */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'rgba(255, 255, 255, 0.75)',
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '2px 6px',
          letterSpacing: '0.06em',
          pointerEvents: 'none',
          textTransform: 'uppercase',
          borderLeft: `2px solid ${accentColor}`,
        }}
      >
        RAW_01
      </div>
    </div>
  );
};
