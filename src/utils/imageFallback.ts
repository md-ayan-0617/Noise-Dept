/**
 * Generates an intentional high-contrast industrial zine graphic fallback SVG
 * if an image fails to load or is offline.
 */
export function generateGraphicFallback(title: string, subtitle = 'NOISE DEPT. // RAW ARCHIVE', accent = '#EC3D31'): string {
  const cleanTitle = title.replace(/[<>&"]/g, '');
  const cleanSub = subtitle.replace(/[<>&"]/g, '');
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
    <rect width="100%" height="100%" fill="#111111"/>
    <!-- Technical Grid -->
    <defs>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#222222" stroke-width="1"/>
      </pattern>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)"/>
    <rect width="100%" height="100%" filter="url(#noise)"/>
    
    <!-- Accent Color Block -->
    <rect x="80" y="80" width="16" height="740" fill="${accent}"/>
    
    <!-- Crop Marks & Registration -->
    <circle cx="120" cy="120" r="14" fill="none" stroke="#666666" stroke-width="1.5"/>
    <line x1="120" y1="100" x2="120" y2="140" stroke="#666666" stroke-width="1.5"/>
    <line x1="100" y1="120" x2="140" y2="120" stroke="#666666" stroke-width="1.5"/>

    <circle cx="1080" cy="780" r="14" fill="none" stroke="#666666" stroke-width="1.5"/>
    <line x1="1080" y1="760" x2="1080" y2="800" stroke="#666666" stroke-width="1.5"/>
    <line x1="1060" y1="780" x2="1100" y2="780" stroke="#666666" stroke-width="1.5"/>
    
    <!-- Typography -->
    <text x="130" y="240" font-family="monospace" font-size="24" fill="${accent}" letter-spacing="4">[ ARCHIVE_NODE // 2026 ]</text>
    <text x="130" y="380" font-family="sans-serif" font-weight="900" font-size="82" fill="#E8E6DF" letter-spacing="-2">${cleanTitle}</text>
    <text x="130" y="440" font-family="monospace" font-size="20" fill="#777777" letter-spacing="2">${cleanSub}</text>
    
    <!-- Decorative industrial bars -->
    <rect x="130" y="520" width="380" height="6" fill="#333333"/>
    <rect x="130" y="520" width="140" height="6" fill="${accent}"/>
    
    <text x="130" y="760" font-family="monospace" font-size="14" fill="#555555">LAT 51.5074° N, LON 0.1278° W // CONTROLLED DISORDER // BUFFER VALID</text>
    <text x="1080" y="140" font-family="monospace" font-size="14" fill="#555555" text-anchor="end">SYS.08 // LIVE</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
