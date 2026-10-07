import type { NoteItem } from '../types';

export const notesData: NoteItem[] = [
  {
    slug: 'why-your-website-shouldnt-look-like-everyone-else',
    number: '001',
    title: 'WHY YOUR WEBSITE SHOULDN’T LOOK LIKE EVERY OTHER WEBSITE',
    category: 'DESIGN',
    readTime: '5 MIN',
    date: '24 SEP 2026',
    excerpt: 'The disease of sanitized corporate software aesthetics has infected the entire web. Here is why controlled disorder builds actual memory.',
    previewImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
    content: {
      intro: 'Open ten agency or DTC fashion websites right now. You will see the exact same layout: clean sans-serif logo top-left, 3-column pill cards, pastel gradient blobs in the background, and 24px rounded corners. They look clean. They also look like nobody made them.',
      sections: [
        {
          heading: '01 / The Template Sea',
          body: 'When every tool optimizes for safe consensus, all output converges to the median. When everything looks "correct", nothing is remembered. The human eye filters out expected geometry in milliseconds.',
          pullQuote: 'A website that offends no one also excites no one.',
        },
        {
          heading: '02 / Controlled Disorder vs. Plain Chaos',
          body: 'We are not advocating for broken layouts or illegible paragraphs. The secret is controlled disorder: establishing a rigorous underlying 12-column grid, and then intentionally violating it at strategic focal points.',
          code: `// The rule of 85 / 15
// 85% of your interface must be rock-solid, accessible, readable.
// The remaining 15% should make someone pause and say "what did they just do?"`,
        },
        {
          heading: '03 / Code as Graphic Texture',
          body: 'Treat the browser as a printing press that happens to run at 120Hz. Use variable font widths, imperfect ink bleeds, and technical annotations. Make the medium proud of itself.',
        },
      ],
    },
  },
  {
    slug: 'gsap-without-making-people-sick',
    number: '002',
    title: 'GSAP WITHOUT MAKING PEOPLE SICK: PHYSICS OVER NOVELTY',
    category: 'CODE',
    readTime: '8 MIN',
    date: '12 AUG 2026',
    excerpt: 'Too many creative developer portfolios feel like a roller coaster designed by someone who hates roller coasters. How to calibrate motion with intent.',
    previewImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    content: {
      intro: 'There is a fine line between a site that feels tactile and alive, and a site where every scroll wheel flick sends the viewport tumbling through a nauseating 3D wormhole.',
      sections: [
        {
          heading: '01 / The Hierarchy of Motion',
          body: 'Motion should communicate state and priority, not just show off how many GreenSock plugins you purchased. When an element moves, it should have a clear physical origin and a dampening curve that respects user velocity.',
          pullQuote: 'If the animation delays the user from finding the pricing for more than 400ms, delete the animation.',
        },
        {
          heading: '02 / Variable Font Interpolation Done Right',
          body: 'Variable fonts allow manipulating weight and width axis in real time. But animating them on every mousemove event without requestAnimationFrame will cripple battery life.',
          code: `// Efficient axis interpolation with GSAP QuickTo
const widthTo = gsap.quickTo(headlineRef.current, '--font-wdth', {
  duration: 0.25,
  ease: 'power2.out'
});

window.addEventListener('pointermove', (e) => {
  const normX = e.clientX / window.innerWidth;
  widthTo(40 + normX * 160);
});`,
        },
        {
          heading: '03 / Respect Reduced Motion',
          body: 'Always wrap non-essential transforms with window.matchMedia("(prefers-reduced-motion: reduce)"). A truly professional studio never punishes accessibility.',
        },
      ],
    },
  },
  {
    slug: 'when-a-client-needs-custom-software',
    number: '003',
    title: 'WHEN A CLIENT ACTUALLY NEEDS CUSTOM SOFTWARE (AND WHEN THEY DON’T)',
    category: 'BUSINESS',
    readTime: '6 MIN',
    date: '02 JUL 2026',
    excerpt: 'Honest agency talk: 70% of clients who ask for custom software just need a well-configured headless Shopify and a clean schema.',
    previewImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    content: {
      intro: 'We turn down roughly one third of client requests for complex bespoke software. Not because we cannot build it, but because shipping software they will not maintain is an act of developer vanity.',
      sections: [
        {
          heading: '01 / The SaaS Trap',
          body: 'Clients often string together 14 disparate SaaS tools that cost $4,000/month and constantly break. In those specific scenarios, an in-house bespoke micro-tool pays for itself in four months.',
          pullQuote: 'Don’t build custom infrastructure unless it gives you an unfair cultural or operational advantage.',
        },
        {
          heading: '02 / The High-ROI Custom Software Categories',
          body: 'Where does bespoke code shine? Generative brand assets, real-time audio/visual product configurators, and private fulfillment triage dashboards.',
        },
      ],
    },
  },
  {
    slug: 'design-systems-arent-the-design',
    number: '004',
    title: 'DESIGN SYSTEMS AREN’T THE DESIGN: ESCAPING THE FIGMA PRISON',
    category: 'OPINION',
    readTime: '4 MIN',
    date: '18 MAY 2026',
    excerpt: 'Tokens and color swatches are inventory, not art. Why over-indexing on design system maintenance kills the soul of experimental work.',
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    content: {
      intro: 'We have seen teams spend four months naming color tokens like color-neutral-slate-alpha-200 while their actual product looks thoroughly uninspired. A design system is a pantry; cooking a memorable meal is an entirely different discipline.',
      sections: [
        {
          heading: '01 / Systems as Scaffolding',
          body: 'A great system gives you the speed to improvise. If your system is so rigid that you cannot make a headline 240px wide for a single key announcement without breaking twelve component contracts, your system is failing you.',
          pullQuote: 'The purpose of a grid is to make breaking the grid meaningful.',
        },
        {
          heading: '02 / Prototype in the Medium',
          body: 'Figma vectors do not know what 120Hz display refresh feels like. They do not know how typography responds to trackpad inertia. Jump into Vite and write the HTML.',
        },
      ],
    },
  },
  {
    slug: 'the-9-week-sprint-cadence',
    number: '005',
    title: 'THE 9-WEEK SPRINT: WHY SPEED PROTECTS CREATIVE VISION',
    category: 'PROCESS',
    readTime: '6 MIN',
    date: '04 APR 2026',
    excerpt: 'Long 12-month agency retainers are where sharp creative ideas go to die in endless stakeholder steering committees. How we compress execution into nine focused weeks.',
    previewImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
    content: {
      intro: 'The enemy of cultural relevance is not small budgets or tight deadlines. It is protracted review cycles that dilute distinct opinions until they become beige consensus.',
      sections: [
        {
          heading: '01 / Time-Boxing as an Aesthetic Filter',
          body: 'When a team knows they have two weeks to lock the typographic framework, they make deliberate, courageous decisions. When they have six months, they test five different shades of gray with twenty focus groups.',
          pullQuote: 'Momentum is a design tool as fundamental as contrast or kerning.',
        },
        {
          heading: '02 / Direct Collaboration Without Middlemen',
          body: 'Putting senior engineers and creative directors in the same daily channel with founders removes the game of telephone. We show working browser prototypes instead of 90-page slide decks.',
          code: `// The Noise Dept. sprint principle:
// Week 01-02: Deconstruction & Archetypes
// Week 03-05: Direct In-Code Prototyping
// Week 06-08: Full Production & Asset Tuning
// Week 09: Hardening, Performance, and Worldwide Launch`,
        },
        {
          heading: '03 / Shipping as Practice',
          body: 'The real test of software is not how pristine it looks on a keynote projector, but how it performs in the hands of real users across Tokyo, London, and New York on spotty cellular connections.',
        },
      ],
    },
  },
];

