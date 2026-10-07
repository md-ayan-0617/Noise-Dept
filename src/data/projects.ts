import type { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    slug: 'static-youth',
    index: '02',
    title: 'STATIC YOUTH',
    category: 'Music platform',
    client: 'Static Youth Records / Berlin',
    year: '2026',
    accentColor: '#EC3D31',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop', // music mixing / underground audio visual
    secondaryImages: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    ],
    summary: 'A subcultural streaming and tape-archive platform for independent industrial techno and experimental club tracks.',
    challenge: 'Mainstream streaming services flatten underground music into corporate gray carousels and sterile recommendation algorithms. Static Youth required an interface that feels like digging through a crate of limited-run cassette tapes in an abandoned warehouse basement.',
    solution: 'We engineered an aggressive, hardware-inspired digital archive featuring bespoke audio visualizers, raw terminal-like track queues, and zero algorithmic censorship. The interface embraces high-contrast Signal Red and unvarnished mono typography.',
    metrics: [
      { label: 'DELIVERY TIMELINE', value: '03 MONTHS' },
      { label: 'STREAM INTEGRATION', value: 'HLS LOSSLESS' },
      { label: 'CUSTOM SHADERS', value: '4 WEBGL PASSES' },
      { label: 'CASSETTE RELEASES', value: '18 CATALOGUED' },
    ],
    tags: ['Web Audio API', 'Three.js', 'GSAP ScrollTrigger', 'Headless CMS', 'Custom Player'],
    services: ['Brand System', 'Digital Strategy', 'Full-stack Creative Development', 'Audio Engine'],
    codeSnippet: `// Static Youth Canvas Audio Shader Dispatch
const initBufferSync = (ctx: AudioContext, analyser: AnalyserNode) => {
  const buffer = new Uint8Array(analyser.frequencyBinCount);
  const computeDisorder = () => {
    analyser.getByteFrequencyData(buffer);
    const energy = buffer.reduce((acc, val) => acc + val, 0) / buffer.length;
    document.documentElement.style.setProperty('--track-velocity', \`\${energy * 0.08}deg\`);
    requestAnimationFrame(computeDisorder);
  };
  computeDisorder();
};`,
    nextSlug: 'null-form',
  },
  {
    slug: 'null-form',
    index: '01',
    title: 'NULL//FORM',
    category: 'Fashion commerce',
    client: 'NULL Studio / Milan',
    year: '2026',
    accentColor: '#C7FF32',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop', // high fashion editorial avant-garde
    secondaryImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    ],
    summary: 'A radical headless e-commerce experience for an architectural streetwear label with zero generic product grids.',
    challenge: 'Typical fashion Shopify themes look identical: clean white margins, centered serif logo, cookie-cutter product squares. NULL needed a storefront that operates like an interactive runway catalogue, treating garments as sculptural garments.',
    solution: 'Designed an unaligned vertical editorial scroll with interactive garment fabric zoom, raw technical specification tags, instant basket micro-interactions, and instant headless checkout.',
    metrics: [
      { label: 'DEVELOPMENT SPRINT', value: '08 WEEKS' },
      { label: 'TIME TO INTERACTIVE', value: '0.42 SECONDS' },
      { label: 'AVERAGE SESSION', value: '4M 18S' },
      { label: 'CHECKOUT LATENCY', value: '< 200MS' },
    ],
    tags: ['Next.js / Vite', 'Shopify Storefront API', 'GSAP Flip', 'Custom Cart', 'Tailored Typography'],
    services: ['E-Commerce Architecture', 'Design Direction', 'Custom Front-end', 'Motion System'],
    codeSnippet: `// NULL//FORM Dynamic Fabric Magnifier
const handleGarmentInspect = (event: PointerEvent, container: HTMLElement) => {
  const { left, top, width, height } = container.getBoundingClientRect();
  const relX = ((event.clientX - left) / width) * 100;
  const relY = ((event.clientY - top) / height) * 100;
  gsap.to('.garment-spec-overlay', {
    clipPath: \`circle(120px at \${relX}% \${relY}%)\`,
    duration: 0.15,
    ease: 'power2.out',
  });
};`,
    nextSlug: 'machine-girl',
  },
  {
    slug: 'machine-girl',
    index: '03',
    title: 'MACHINE GIRL',
    category: 'Interactive album campaign',
    client: 'Ghost Light Recordings / NYC',
    year: '2025',
    accentColor: '#3155FF',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop', // hardware circuit aesthetic
    secondaryImages: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
    ],
    summary: 'A 3D playable cybernetic microsite celebrating an experimental hardcore synth album launch.',
    challenge: 'Fans needed more than a pre-save link; they wanted an ARG-like interactive artifact that allowed them to unpack stems, inspect 3D synthesized objects, and decipher unreleased lyrics.',
    solution: 'Crafted a custom WebGL procedural room where users manipulate vintage cathode-ray monitors, scrub audio stems, and unlock secret merchandise drops.',
    metrics: [
      { label: 'GLOBAL TRAFFIC PEAK', value: '180K USERS/HR' },
      { label: 'PRE-SAVES CONVERTED', value: '42,000+' },
      { label: 'FAN PUZZLE SOLVES', value: '9,410' },
      { label: 'GPU CRASH RATE', value: '0.01%' },
    ],
    tags: ['WebGL', 'Three.js GLSL', 'Audio Nodes', 'Interactive Campaign', 'Reverse Engineering'],
    services: ['Campaign Concept', 'Interactive 3D Art', 'Sound Design Integration', 'Launch Architecture'],
    codeSnippet: `// Machine Girl Cathode Ray Tube Glitch Uniform
uniform float uTime;
uniform vec2 uResolution;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float scanline = sin(uv.y * 800.0 + uTime * 20.0) * 0.04;
  vec3 col = texture2D(tDiffuse, uv + vec2(scanline, 0.0)).rgb;
  gl_FragColor = vec4(col, 1.0);
}`,
    nextSlug: 'dust-archive',
  },
  {
    slug: 'dust-archive',
    index: '04',
    title: 'DUST ARCHIVE',
    category: 'Fashion archive',
    client: 'Fondazione Tessile / Antwerp',
    year: '2025',
    accentColor: '#FF6433',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop', // tactile textures & archive apparel
    secondaryImages: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop',
    ],
    summary: 'A searchable high-resolution digital museum of 1990s avant-garde Belgian and Japanese garments.',
    challenge: 'Preserving over 1,200 delicate physical pieces in a browsable format without reducing them to tiny thumbnails or slow museum catalogues.',
    solution: 'Designed an infinite panning canvas with deep zoom tiles, barcode indexation, provenance timelines, and curator voice notes.',
    metrics: [
      { label: 'ARCHIVE ENTRIES', value: '1,240 PIECES' },
      { label: 'IMAGE RESOLUTION', value: '8K GIGAPIXEL' },
      { label: 'TAXONOMY NODES', value: '86 CATEGORIES' },
      { label: 'PAGE SWITCH TIME', value: '< 100MS' },
    ],
    tags: ['Infinite Canvas', 'Deep Zoom', 'Zustand State', 'Archive UX', 'Industrial Typo'],
    services: ['Information Architecture', 'Archive Interface', 'Performance Engineering', 'Database Design'],
    codeSnippet: `// Dust Archive Infinite Viewport Panning
const onPanViewport = (dx: number, dy: number, state: ArchiveState) => {
  state.coords.x = Math.max(state.bounds.minX, Math.min(state.bounds.maxX, state.coords.x + dx));
  state.coords.y = Math.max(state.bounds.minY, Math.min(state.bounds.maxY, state.coords.y + dy));
  renderVisibleTiles(state.coords, state.zoomLevel);
};`,
    nextSlug: 'offgrid',
  },
  {
    slug: 'offgrid',
    index: '05',
    title: 'OFFGRID',
    category: 'Creative software',
    client: 'Offgrid Systems / Tokyo',
    year: '2024',
    accentColor: '#A894FF',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop', // code workspace & monitor typography
    secondaryImages: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    ],
    summary: 'A minimalist node-based generative typography and SVG motion engine for screen printers and poster artists.',
    challenge: 'Existing design software is bloated with corporate SaaS panels and subscription popups. Offgrid wanted a lightning-fast tool built for typography purists.',
    solution: 'Engineered an in-browser WebGL vector rendering tool that converts variable font glyphs into bezier offsets and exports directly to plotter and screen print films.',
    metrics: [
      { label: 'FPS BENCHMARK', value: '60 FPS LOCKED' },
      { label: 'ACTIVE DESIGNERS', value: '24,000+' },
      { label: 'SVG GENERATION', value: '12MS RENDERING' },
      { label: 'BUNDLE SIZE', value: '84KB GZIPPED' },
    ],
    tags: ['WebAssembly', 'Canvas2D', 'Node Graph', 'Variable Fonts', 'SVG Plotter Export'],
    services: ['Web Application Design', 'Canvas Performance', 'User Interface Architecture', 'Software Branding'],
    codeSnippet: `// Offgrid Vector Glyphs Extraction
export function decomposeGlyphPath(font: opentype.Font, text: string, fontSize: number) {
  const path = font.getPath(text, 0, fontSize, fontSize);
  return path.commands.map(cmd => {
    if (cmd.type === 'M' || cmd.type === 'L') return [cmd.x, cmd.y];
    return [cmd.x1, cmd.y1, cmd.x, cmd.y];
  });
}`,
    nextSlug: 'fragment',
  },
  {
    slug: 'fragment',
    index: '06',
    title: 'FRAGMENT',
    category: 'Culture magazine',
    client: 'Fragment Publishing / London',
    year: '2024',
    accentColor: '#70F5EB',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1600&auto=format&fit=crop', // printed books & zines
    secondaryImages: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1200&auto=format&fit=crop',
    ],
    summary: 'A quarterly publication exploring the collisions between brutalist architecture, electronic music, and club flyers.',
    challenge: 'Transitioning a beloved physical printed zine into a digital publication without losing the physical joy of imperfect paper stock, oversized margins, and fold-out spreads.',
    solution: 'Constructed an editorial reader featuring responsive double-page layouts, variable width title interactions, and a digital fold-out poster archive.',
    metrics: [
      { label: 'EDITIONS PUBLISHED', value: '08 VOLUMES' },
      { label: 'AVERAGE READ TIME', value: '7M 24S' },
      { label: 'SUBSCRIBERS', value: '18,500' },
      { label: 'PRINT COMPATIBILITY', value: '100% PDF OUTPUT' },
    ],
    tags: ['Editorial Layout', 'Responsive Typography', 'GSAP Scroll', 'Multi-column CSS', 'Zine Archive'],
    services: ['Editorial Strategy', 'Digital Publication', 'Design Direction', 'Custom Reader'],
    codeSnippet: `// Fragment Editorial Column Balancer
const balanceReadingColumns = (container: HTMLElement) => {
  const words = container.querySelectorAll('.editorial-lead-word');
  words.forEach((w, idx) => {
    const delay = (idx % 6) * 0.04;
    w.setAttribute('style', \`transition-delay: \${delay}s;\`);
  });
};`,
    nextSlug: 'static-youth',
  },
];

// Additional archive items for /archive and work modes
export const archiveItems = [
  { id: '007', title: 'HYPER_NOISE', client: 'Self-Initiated', year: '2023', category: 'WebGL Experiment', accent: '#EC3D31' },
  { id: '008', title: 'KINETIC POSTER 04', client: 'Tokyo Print Club', year: '2023', category: 'Graphic Design', accent: '#C7FF32' },
  { id: '009', title: 'SONIC MONOLITH', client: 'Sub-Bass Audio', year: '2023', category: 'Interactive Audio', accent: '#3155FF' },
  { id: '010', title: 'ANARCHIVE 88', client: 'Underground Press', year: '2022', category: 'Zine Web Platform', accent: '#FF6433' },
  { id: '011', title: 'ZERO GRAVITY TYPE', client: 'Type Lab Milan', year: '2022', category: 'Variable Font Tool', accent: '#A894FF' },
  { id: '012', title: 'TERMINAL VOID', client: 'Off-Pitch Collective', year: '2022', category: 'Audio Visualizer', accent: '#70F5EB' },
];
