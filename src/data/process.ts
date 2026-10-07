import type { ProcessStepItem } from '../types';

export const processStepsData: ProcessStepItem[] = [
  {
    number: '01',
    title: 'LISTEN',
    tagline: 'Coffee, raw transcripts, and cutting through boilerplate.',
    description: 'We sit down and pull apart what your business actually does versus what you think your marketing copy says. No sales fluff. We uncover the friction, the obsessiveness, and the cultural context.',
    humanPresence: 'Messy notebook with black ink scribbles, espresso cup, audio voice memos.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop', // notebook, pen, coffee
    output: 'Raw project brief, unedited constraints, core ambition.',
  },
  {
    number: '02',
    title: 'FRAME',
    tagline: 'Flow trees on the floor, structural boundaries.',
    description: 'Before styling anything, we map the entire information ecosystem. What must the visitor feel within 3 seconds? How do they navigate when they are impatient? We discard 40% of non-essential pages.',
    humanPresence: 'Post-its on concrete floor, tape marks, marked wireframe cutouts.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop', // wireframes & sketches
    output: 'System schematic, content hierarchy, technical scope.',
  },
  {
    number: '03',
    title: 'EXPLORE',
    tagline: 'Throwing paint at the wall: type, motion, chaos.',
    description: 'We build rapid aesthetic prototypes. We stress-test oversized typography, test dynamic variable font axes, and construct raw motion tests directly in the browser to see what has teeth.',
    humanPresence: 'Typography test sheets taped to studio wall, direct flash photo captures.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop', // studio wall / print sheets
    output: '3 distinct typographic & interactive directions.',
  },
  {
    number: '04',
    title: 'DESIGN',
    tagline: 'Precision layout, typography, intentional tension.',
    description: 'Fleshing out every breakpoint and state into high-fidelity design systems. We treat typography as physical architecture and establish the precise grid rules—and where we will break them.',
    humanPresence: 'Hand adjusting kerning on large monitor, color swatches on desk.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop', // designer at desk
    output: 'Complete Figma master design system & interaction specs.',
  },
  {
    number: '05',
    title: 'BUILD',
    tagline: 'Code as a tactile craft: React, GSAP, WebGL.',
    description: 'The real work happens here. We write clean, resilient, modular code. We calibrate spring physics, variable font scroll triggers, and WebGL buffers until every interaction feels tactile and snappy.',
    humanPresence: 'Hands typing code on split mechanical keyboard in dark studio ambient light.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop', // keyboard coding hands
    output: 'Production React codebase with zero bloated dependencies.',
  },
  {
    number: '06',
    title: 'BREAK',
    tagline: 'Stress testing, throttling, physical device gauntlet.',
    description: 'We open the build on 10 devices simultaneously: low-end Androids, old iPads, ultra-wide studio monitors. We throttle CPU to 4x slow, cut Wi-Fi abruptly, and ensure the fallback systems survive anything.',
    humanPresence: 'Assortment of phones and laptops spread over concrete studio floor.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop', // mobile devices and testing
    output: 'Lighthouse 95+ score, responsive bulletproofing, 60fps animations.',
  },
  {
    number: '07',
    title: 'LAUNCH',
    tagline: 'Deploying to edge CDN, live domain, real humans.',
    description: 'Domain configuration, SSL verification, edge cache warm-up, and flipping the switch. We watch live analytics, monitor edge logs, and celebrate the launch with a real physical release moment.',
    humanPresence: 'Holding phone with live website outside under natural daylight.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop', // launch collaborative team
    output: 'Live production URL, edge caching active, analytics firing.',
  },
  {
    number: '08',
    title: 'SUPPORT',
    tagline: 'Post-launch tuning, iterative refinement, no vanishing.',
    description: 'We do not drop a zip file and disappear into the ether. We stick around through initial traffic spikes, tune real user behavior, and train your team on headless content management.',
    humanPresence: 'Chat terminal on laptop screen with live client feedback.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop', // workspace monitor
    output: '30-day post-launch warranty, CMS documentation, ongoing partnership.',
  },
];

export const processTimeline = [
  { week: 'WEEK 01', phase: 'DISCOVERY', notes: 'Listen, frame core problem, deconstruct constraints' },
  { week: 'WEEK 02', phase: 'DIRECTION', notes: 'Aesthetic exploration, typography stress-test, prototype code' },
  { week: 'WEEKS 03–04', phase: 'SYSTEM DESIGN', notes: 'Full breakpoint architecture, interactive states, design system' },
  { week: 'WEEKS 05–08', phase: 'DEVELOPMENT', notes: 'React 19, GSAP timelines, WebGL, headless API wiring' },
  { week: 'WEEK 09', phase: 'QA / LAUNCH', notes: 'Multi-device gauntlet, performance lockdown, worldwide release' },
];
