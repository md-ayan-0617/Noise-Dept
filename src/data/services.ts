import type { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'DIGITAL DIRECTION',
    summary: 'Strategic clarity before a single pixel moves. We interrogate what you are actually making and why anyone should care.',
    deliverables: [
      'Digital Strategy & Brand Positioning',
      'Information Architecture & Flow Trees',
      'Art Direction & Typographic Identity',
      'Interactive Concept Prototypes',
    ],
    stack: ['Figma', 'Miro', 'Motion Studies', 'Typography Tokens'],
    previewImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop', // wireframes & diagrams
  },
  {
    number: '02',
    title: 'WEB DESIGN',
    summary: 'Brand-led interfaces that reject sanitized corporate templates. We treat the browser like an interactive printed poster.',
    deliverables: [
      'Bespoke Visual Systems',
      'Responsive Typographic Hierarchy',
      'Editorial & Cultural Layouts',
      'Micro-interactions & Physics',
    ],
    stack: ['Variable Fonts', 'Grid Systems', 'Art Direction', 'Prototyping'],
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop', // design layout
  },
  {
    number: '03',
    title: 'CREATIVE DEVELOPMENT',
    summary: 'Code as a core design material. We engineer motion, physics, and interaction directly in code with zero handoff compromises.',
    deliverables: [
      'GSAP Scroll & FLIP Engineering',
      'WebGL & GLSL Custom Shaders',
      'Interactive Canvas Experiments',
      'Frontend Performance Optimization',
    ],
    stack: ['React', 'TypeScript', 'GSAP', 'Three.js', 'Vite', 'Tailored CSS'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop', // code screen
  },
  {
    number: '04',
    title: 'E-COMMERCE',
    summary: 'Headless, lightning-fast digital storefronts for cult brands, fashion houses, and record labels who refuse standard templates.',
    deliverables: [
      'Headless Shopify / Medusa Architectures',
      'Bespoke Product Experience & Filtering',
      'Instant Bag Micro-Interactions',
      'Global Checkout Integration',
    ],
    stack: ['Shopify Storefront API', 'Next.js / Vite', 'Zustand', 'Stripe'],
    previewImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop', // product object photography
  },
  {
    number: '05',
    title: 'CUSTOM SOFTWARE',
    summary: 'Internal utilities, interactive configurators, and creative tools tailored specifically to how your team thinks and operates.',
    deliverables: [
      'Web-based Generative Utilities',
      'Brand Asset Generators & Plotters',
      'Specialized Content Workflows',
      'High-Density Dashboards',
    ],
    stack: ['Canvas API', 'WebAssembly', 'Node.js', 'REST / GraphQL'],
    previewImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop', // tech workspace
  },
  {
    number: '06',
    title: 'INTERACTIVE CAMPAIGNS',
    summary: 'Unforgettable digital drops, experiential album rollouts, and launch microsites that create genuine subcultural conversation.',
    deliverables: [
      'Experiential 3D Microsites',
      'Audio-Reactive Web Environments',
      'Drop Countdown & Secret Gate Systems',
      'Viral Social Web Artifacts',
    ],
    stack: ['Three.js', 'Web Audio API', 'Physics Simulation', 'Edge Functions'],
    previewImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop', // experimental lighting
  },
];

export const fitCriteria = {
  goodFit: [
    'You care deeply about how your website works and how it feels, not just checking a box.',
    'You appreciate that code is a creative material and want something bespoke.',
    'You can make decisive creative calls without twenty layers of approval committees.',
    'You want your brand to be remembered rather than blend into generic SaaS aesthetics.',
  ],
  badFit: [
    'You need a full website launched tomorrow morning at bargain-basement rates.',
    'You want a pre-made Webflow template copied pixel-for-pixel.',
    'You demand twelve rounds of timid stakeholder committees before choosing a button color.',
    'You believe websites should look like every other competitor in your industry.',
  ],
};
