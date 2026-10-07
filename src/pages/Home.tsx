import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStudioStore } from '../store/useStudioStore';
import { projectsData } from '../data/projects';
import { servicesData } from '../data/services';
import { NoiseImage } from '../components/NoiseImage';
import { TypingText } from '../components/TypingText';

const WebGLSculpture = React.lazy(() =>
  import('../components/WebGLSculpture').then((m) => ({ default: m.WebGLSculpture }))
);

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const { setCursor, setPreviewImage } = useStudioStore();
  const homeContainerRef = useRef<HTMLDivElement>(null);

  // Hero Variable Width Mouse Tracker
  const heroDigitalRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Active service hover state
  const [activeService, setActiveService] = useState<number | null>(0);

  // Active process step
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // GSAP Entrance & ScrollTrigger Context
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } });
      tl.from('.hero-line-1', { y: 40, opacity: 0, delay: 0.15 })
        .from('.hero-line-2', { y: 45, opacity: 0 }, '-=0.6')
        .from('.hero-line-3', { y: 50, opacity: 0 }, '-=0.6')
        .from('.hero-sub-text', { opacity: 0, y: 20 }, '-=0.4');

      // 2. Manifesto Word Progressive Fill (Toxic Green on scroll)
      gsap.to('.manifesto-word', {
        color: '#C7FF32',
        stagger: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.manifesto-section',
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true,
        },
      });

      // 3. Feature Project Scroll Zoom Parallax
      gsap.to('.feature-project-img', {
        scale: 1.05,
        y: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.feature-project-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, homeContainerRef);

    return () => ctx.revert();
  }, []);

  // Hero interactive pointer handling
  useEffect(() => {
    const heroEl = heroSectionRef.current;
    if (!heroEl) return;

    const onPointerMove = (e: PointerEvent) => {
      if (!heroDigitalRef.current) return;
      const rect = heroEl.getBoundingClientRect();
      const normX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const normY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      // Pointer X changes width (60 to 280), Pointer Y changes weight (600 to 900)
      const targetWdth = Math.floor(60 + normX * 220);
      const targetWght = Math.floor(600 + normY * 300);
      heroDigitalRef.current.style.fontVariationSettings = `"wdth" ${targetWdth}, "wght" ${targetWght}`;
    };

    heroEl.addEventListener('pointermove', onPointerMove);
    return () => heroEl.removeEventListener('pointermove', onPointerMove);
  }, []);

  const processSteps = [
    { num: '01', title: 'THINK', copy: 'Deconstructing what you actually do, discarding fluff, and outlining core architectural ambitions.', img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop' },
    { num: '02', title: 'BREAK', copy: 'Laying wireframe schematics on the floor, stress-testing typography, and pushing past the safe consensus.', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop' },
    { num: '03', title: 'BUILD', copy: 'Hands on the keyboard. Writing clean React, GSAP, and WebGL code that performs flawlessly at 120Hz.', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop' },
    { num: '04', title: 'SHIP', copy: 'Multi-device gauntlet, edge server deployment, and releasing a digital object that actually sticks in memory.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop' },
  ];

  return (
    <div ref={homeContainerRef} className="home-container" style={{ width: '100%', overflowX: 'hidden' }}>

      {/* =====================================================
          CHAPTER 01: HERO (100svh, Paper #E9E7E0)
          ===================================================== */}
      <section
        ref={heroSectionRef}
        className="theme-light"
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '100px 32px 32px 32px',
          position: 'relative',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Top Reference Line */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#666',
            letterSpacing: '0.12em',
            borderBottom: '1px solid rgba(17, 17, 17, 0.12)',
            paddingBottom: '12px',
          }}
        >
          <span>NOISE DEPT. // INDEPENDENT DIGITAL STUDIO</span>
          <span>EST. 2024 / WORLDWIDE</span>
        </div>

        {/* Hero Central Poster Composition */}
        <div style={{ margin: 'auto 0', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 11vw, 175px)',
              fontWeight: 800,
              lineHeight: 0.88,
              textTransform: 'uppercase',
              letterSpacing: '-0.04em',
            }}
          >
            {/* Line 1: Condensed */}
            <div className="hero-line-1" style={{ fontVariationSettings: '"wdth" 45, "wght" 800' }}>
              WE MAKE
            </div>

            {/* Line 2: Extremely Wide with Pointer Interaction & Embedded Portrait */}
            <div
              className="hero-line-2"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <span
                ref={heroDigitalRef}
                style={{
                  fontVariationSettings: '"wdth" 240, "wght" 800',
                  color: '#111111',
                  transition: 'font-variation-settings 0.08s ease-out',
                }}
              >
                DIGITAL
              </span>

              {/* Small Portrait Candidate Image Intersecting Typography */}
              <div
                style={{
                  width: 'clamp(75px, 14vw, 180px)',
                  height: 'clamp(100px, 18vw, 230px)',
                  border: '2px solid #111111',
                  backgroundColor: '#111',
                  overflow: 'hidden',
                  flexShrink: 0,
                  transform: 'rotate(-2deg)',
                  boxShadow: '6px 6px 0px #EC3D31',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={() => setCursor('view')}
                onMouseLeave={() => setCursor('default')}
              >
                <NoiseImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                  alt="Creative Developer Candid Studio Portrait"
                  fallbackTitle="PORTRAIT"
                  fallbackSubtitle="CANDID_STUDIO"
                  accentColor="#EC3D31"
                  grayscaleByDefault={false}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>

            {/* Line 3: Medium */}
            <div className="hero-line-3" style={{ fontVariationSettings: '"wdth" 110, "wght" 900' }}>
              THINGS.
            </div>
          </div>

          {/* Secondary Statement & Hero Typing Sequence */}
          <div
            className="hero-sub-text"
            style={{
              marginTop: '36px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.35vw, 21px)', lineHeight: 1.45, maxWidth: '620px', color: '#222' }}>
              Independent design and development studio building digital systems for brands that would rather be remembered than look familiar.
            </div>

            <div style={{ borderLeft: '2px solid #111', paddingLeft: '16px' }}>
              <TypingText />
            </div>
          </div>
        </div>

        {/* Hero Footer Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(17, 17, 17, 0.12)',
            paddingTop: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#444',
          }}
        >
          <span>01 / HOME</span>
          <span>SCROLL ↓ EXPLORE DISORDER</span>
          <span>AVAILABLE FOR SELECT PROJECTS</span>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 02: WORK INTRO (Black)
          ===================================================== */}
      <section
        className="theme-dark"
        style={{
          padding: '120px 32px 60px 32px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0B0B0B',
          color: '#E8E6DF',
        }}
      >
        {/* Giant Repeated Background Typography WORKWORKWORK */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '-10%',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 20vw, 320px)',
            fontWeight: 900,
            color: 'rgba(232, 230, 223, 0.05)',
            lineHeight: 0.8,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          WORKWORKWORKWORK
        </div>

        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#EC3D31', letterSpacing: '0.15em', marginBottom: '12px' }}>
            01 // SELECTED WORK
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '24px',
              borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
              paddingBottom: '32px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-section)',
                fontWeight: 900,
                lineHeight: 0.9,
                margin: 0,
              }}
            >
              SELECTED WORK <br />
              <span style={{ color: '#777' }}>2024—26</span>
            </h2>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', maxWidth: '380px', color: '#888' }}>
              A few things we designed, coded, launched, and occasionally lost sleep over.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 03: PROJECT INDEX (List Rows, Not Cards)
          ===================================================== */}
      <section
        style={{
          backgroundColor: '#0B0B0B',
          color: '#E8E6DF',
          borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
        }}
      >
        {projectsData.map((project) => (
          <Link
            key={project.slug}
            to={`/work/${project.slug}`}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
              padding: '36px 32px',
              transition: 'background-color 0.2s ease, padding 0.2s ease',
            }}
            onMouseEnter={() => {
              setCursor('open');
              setPreviewImage(project.coverImage);
            }}
            onMouseLeave={() => {
              setCursor('default');
              setPreviewImage(null);
            }}
          >
            <div
              style={{
                maxWidth: '1440px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'minmax(40px, 60px) 1.8fr 1fr minmax(60px, 80px)',
                alignItems: 'center',
                gap: '24px',
              }}
              className="project-row"
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#777' }}>
                {project.index}
              </span>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(30px, 5.5vw, 80px)',
                    fontWeight: 800,
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    transition: 'color 0.2s ease, transform 0.2s ease',
                  }}
                  className="project-title"
                >
                  {project.title}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#777', marginTop: '6px' }}>
                  {project.summary}
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#aaa', textTransform: 'uppercase' }}>
                {project.category}
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#777', textAlign: 'right' }}>
                {project.year}
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* =====================================================
          CHAPTER 04: FEATURE PROJECT (STATIC YOUTH, Signal Red #EC3D31)
          ===================================================== */}
      <section
        className="feature-project-section"
        style={{
          backgroundColor: '#EC3D31',
          color: '#0B0B0B',
          padding: '120px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '16px' }}>
            FEATURE RELEASE // 02
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(300px, 1fr)', gap: '48px', alignItems: 'center' }}>
            {/* Title & Narrative */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(50px, 9.5vw, 140px)',
                  fontWeight: 900,
                  lineHeight: 0.85,
                  margin: 0,
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                }}
              >
                STATIC <br />
                YOUTH
              </h2>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', lineHeight: 1.5, marginTop: '28px', maxWidth: '520px', fontWeight: 500 }}>
                A hardware-inspired subcultural streaming and cassette archive platform engineered for Berlin's industrial techno scene.
              </p>

              <div style={{ marginTop: '36px' }}>
                <Link
                  to="/work/static-youth"
                  className="btn-raw-solid"
                  style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', borderColor: '#0B0B0B' }}
                  onMouseEnter={() => setCursor('open')}
                  onMouseLeave={() => setCursor('default')}
                >
                  VIEW CASE STUDY ↗
                </Link>
              </div>
            </div>

            {/* Pinned Offset Browser Capture */}
            <div
              className="feature-project-img"
              style={{
                position: 'relative',
                boxShadow: '16px 16px 0px #0B0B0B',
                border: '2px solid #0B0B0B',
                backgroundColor: '#111',
              }}
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
            >
              <NoiseImage
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
                alt="Static Youth Platform Screenshot"
                fallbackTitle="STATIC YOUTH"
                fallbackSubtitle="CASSETTE_STREAM_UI"
                accentColor="#EC3D31"
                grayscaleByDefault={false}
                style={{ width: '100%', height: '480px' }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#0B0B0B',
                  color: '#C7FF32',
                  padding: '4px 8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                UI_NODE // 02
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 05: PROCESS TEASER (Paper)
          ===================================================== */}
      <section
        className="theme-light"
        style={{
          padding: '120px 32px',
          borderBottom: '1px solid rgba(17, 17, 17, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#666',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}
          >
            02_PROCESS // HOW THE MESS BECOMES THE THING
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(340px, 1fr)', gap: '48px' }} className="process-teaser-grid">
            {/* Step Selector List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {processSteps.map((step, idx) => {
                const isActive = activeProcessStep === idx;
                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveProcessStep(idx)}
                    style={{
                      borderBottom: '1px solid rgba(17, 17, 17, 0.15)',
                      paddingBottom: '24px',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setCursor('default')}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '18px',
                          color: isActive ? '#EC3D31' : '#888',
                          fontWeight: 700,
                        }}
                      >
                        {step.num}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(28px, 4.5vw, 60px)',
                          fontWeight: 800,
                          color: isActive ? '#111' : '#666',
                          fontVariationSettings: isActive ? '"wdth" 180, "wght" 900' : '"wdth" 60, "wght" 600',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {step.title}
                      </span>
                    </div>

                    {isActive && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#333', marginTop: '12px', maxWidth: '480px', lineHeight: 1.45 }}>
                        {step.copy}
                      </p>
                    )}
                  </div>
                );
              })}

              <div style={{ marginTop: '20px' }}>
                <Link to="/process" className="btn-raw" onMouseEnter={() => setCursor('open')} onMouseLeave={() => setCursor('default')}>
                  FULL 8-STEP BREAKDOWN →
                </Link>
              </div>
            </div>

            {/* Dynamic Step Human Image */}
            <div
              style={{
                border: '2px solid #111',
                height: '460px',
                position: 'relative',
                boxShadow: '10px 10px 0px #111',
                overflow: 'hidden',
              }}
            >
              <NoiseImage
                src={processSteps[activeProcessStep].img}
                alt={processSteps[activeProcessStep].title}
                fallbackTitle={processSteps[activeProcessStep].title}
                fallbackSubtitle="PROCESS_ARCHIVE"
                accentColor="#EC3D31"
                grayscaleByDefault={false}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 06: MANIFESTO STATEMENT (Black + Toxic Green Words)
          ===================================================== */}
      <section
        className="manifesto-section"
        style={{
          backgroundColor: '#0B0B0B',
          color: '#E8E6DF',
          padding: '140px 32px',
          borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C7FF32', letterSpacing: '0.2em', marginBottom: '24px' }}>
            // MANIFESTO_01
          </div>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 7.5vw, 120px)',
              fontWeight: 900,
              lineHeight: 0.9,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            <span className="manifesto-word" style={{ color: 'rgba(232, 230, 223, 0.2)', transition: 'color 0.1s ease' }}>GOOD </span>
            <span className="manifesto-word" style={{ color: 'rgba(232, 230, 223, 0.2)', transition: 'color 0.1s ease' }}>DESIGN </span>
            <span className="manifesto-word" style={{ color: 'rgba(232, 230, 223, 0.2)', transition: 'color 0.1s ease' }}>IS </span>
            <span className="manifesto-word" style={{ color: 'rgba(232, 230, 223, 0.2)', transition: 'color 0.1s ease' }}>NOT </span>
            <span className="manifesto-word" style={{ color: 'rgba(232, 230, 223, 0.2)', transition: 'color 0.1s ease' }}>DECORATION.</span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(16px, 1.8vw, 26px)',
              color: '#888',
              marginTop: '36px',
              maxWidth: '760px',
              lineHeight: 1.5,
            }}
          >
            And development isn’t the part that happens after. Code is a core creative medium. When designers understand the browser and developers obsess over typography, the interface stops feeling like a template.
          </p>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 07: SERVICES (Dense Rows)
          ===================================================== */}
      <section
        className="theme-light"
        style={{
          padding: '120px 32px',
          borderBottom: '1px solid rgba(17, 17, 17, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '48px', borderBottom: '1px solid rgba(17, 17, 17, 0.15)', paddingBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-section)', fontWeight: 900, margin: 0, lineHeight: 0.9 }}>
              WHAT WE <br />ACTUALLY DO.
            </h2>
            <Link to="/services" className="btn-raw" onMouseEnter={() => setCursor('open')} onMouseLeave={() => setCursor('default')}>
              ALL CAPABILITIES ↗
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {servicesData.map((service, index) => {
              const isOpen = activeService === index;

              return (
                <div
                  key={service.number}
                  onClick={() => setActiveService(isOpen ? null : index)}
                  style={{
                    borderBottom: '1px solid rgba(17, 17, 17, 0.15)',
                    padding: '28px 0',
                    cursor: 'pointer',
                    transition: 'padding 0.2s ease',
                  }}
                  onMouseEnter={() => setCursor('open')}
                  onMouseLeave={() => setCursor('default')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#777' }}>
                        {service.number}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(24px, 4.5vw, 64px)',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          color: isOpen ? '#EC3D31' : '#111',
                          fontVariationSettings: isOpen ? '"wdth" 160, "wght" 900' : '"wdth" 80, "wght" 700',
                          transition: 'font-variation-settings 0.2s ease, color 0.2s ease',
                        }}
                      >
                        {service.title}
                      </span>
                    </div>

                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700 }}>
                      {isOpen ? '[ - ]' : '[ + ]'}
                    </span>
                  </div>

                  {isOpen && (
                    <div
                      style={{
                        marginTop: '24px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '32px',
                        paddingLeft: '48px',
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', marginBottom: '8px' }}>
                          // SUMMARY
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#222', lineHeight: 1.45 }}>
                          {service.summary}
                        </p>
                      </div>

                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', marginBottom: '8px' }}>
                          // DELIVERABLES
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#444', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {service.deliverables.map((del, dIdx) => (
                            <li key={dIdx}>→ {del}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777', marginBottom: '8px' }}>
                          // TECH STACK
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {service.stack.map((item, sIdx) => (
                            <span key={sIdx} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', background: '#111', color: '#E9E7E0', padding: '2px 8px' }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 08: WEBGL EXPERIMENT / LAB_001
          ===================================================== */}
      <section
        style={{
          backgroundColor: '#0B0B0B',
          color: '#E8E6DF',
          padding: '100px 32px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C7FF32', letterSpacing: '0.15em' }}>
              03 // LAB_001: KINETIC SCULPTURE
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#777' }}>
              INTERACTIVE THREE.JS GLSL
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5.5vw, 84px)', fontWeight: 900, margin: 0, lineHeight: 0.9 }}>
            BREAK THE GRID.
          </h2>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#888', marginTop: '12px', marginBottom: '24px' }}>
            Move mouse or drag touch to orbit camera. Scroll down to pull the extruded letterforms apart and reveal the hidden typography.
          </p>

          {/* Three.js Interactive Letter Sculpture */}
          <React.Suspense
            fallback={
              <div
                style={{
                  height: '420px',
                  backgroundColor: '#111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#C7FF32',
                }}
              >
                // INITIALIZING 3D TYPOGRAPHIC BUFFER...
              </div>
            }
          >
            <WebGLSculpture />
          </React.Suspense>

          <div style={{ marginTop: '24px', textAlign: 'right' }}>
            <Link to="/lab" className="btn-raw" onMouseEnter={() => setCursor('break')} onMouseLeave={() => setCursor('default')}>
              OPEN FULL EXPERIMENTAL LAB (6 EXPERIMENTS) →
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 09: HUMAN PROOF / TESTIMONIAL
          ===================================================== */}
      <section
        className="theme-light"
        style={{
          padding: '140px 32px',
          borderBottom: '1px solid rgba(17, 17, 17, 0.12)',
        }}
      >
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#666', letterSpacing: '0.15em', marginBottom: '24px' }}>
            // UNFILTERED FEEDBACK
          </div>

          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 4.5vw, 70px)',
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            "THEY TOOK THE HALF-FINISHED IDEA IN MY HEAD AND TURNED IT INTO SOMETHING BETTER. ZERO CORPORATE BULLSHIT, JUST PURE EXECUTION."
          </blockquote>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '48px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                border: '1px solid #111',
                overflow: 'hidden',
              }}
            >
              <NoiseImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                alt="Client Portrait Marcus Vogel"
                fallbackTitle="CLIENT"
                accentColor="#EC3D31"
                grayscaleByDefault={false}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700 }}>
                MARCUS VOGEL
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#666' }}>
                FOUNDER // STATIC YOUTH RECORDS, BERLIN
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 10: ABOUT TEASER (Direct Flash Portrait)
          ===================================================== */}
      <section
        style={{
          backgroundColor: '#0B0B0B',
          color: '#E8E6DF',
          padding: '120px 32px',
          borderBottom: '1px solid rgba(232, 230, 223, 0.12)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(320px, 1fr)',
            gap: '64px',
            alignItems: 'center',
          }}
          className="about-teaser-grid"
        >
          {/* Portrait with Direct-Flash Crop */}
          <div
            style={{
              border: '2px solid rgba(232, 230, 223, 0.2)',
              backgroundColor: '#151515',
              boxShadow: '12px 12px 0px #C7FF32',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('default')}
          >
            <NoiseImage
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
              alt="Studio Lead Direct Flash"
              fallbackTitle="NOISE DEPT"
              fallbackSubtitle="STUDIO_PROFILE"
              accentColor="#C7FF32"
              grayscaleByDefault={false}
              style={{ width: '100%', height: '520px' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                backgroundColor: '#0B0B0B',
                color: '#E8E6DF',
                padding: '4px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
              }}
            >
              DIRECT_FLASH // CANON 35MM
            </div>
          </div>

          {/* Copy and Ambition */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C7FF32', letterSpacing: '0.15em', marginBottom: '16px' }}>
              WHO ARE WE?
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 6vw, 86px)',
                fontWeight: 900,
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              SMALL STUDIO. <br />
              BIG OPINIONS.
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.55, marginTop: '24px', color: '#aaa' }}>
              We’re intentionally small. The person discussing the project is also involved in designing and building it. No sales teams. No junior team handoff after the proposal.
            </p>

            <div style={{ marginTop: '36px' }}>
              <Link to="/about" className="btn-raw-solid" onMouseEnter={() => setCursor('open')} onMouseLeave={() => setCursor('default')}>
                READ FULL PROFILE →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHAPTER 11: FINAL AGGRESSIVE CTA (Toxic Green #C7FF32)
          ===================================================== */}
      <section
        style={{
          backgroundColor: '#C7FF32',
          color: '#0B0B0B',
          padding: '160px 32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '16px' }}>
            // READY TO LAUNCH?
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(54px, 12vw, 195px)',
              fontWeight: 900,
              lineHeight: 0.85,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              margin: '0 auto',
            }}
          >
            HAVE <br />
            SOMETHING <br />
            WEIRD? <br />
            <span
              style={{
                color: '#EC3D31',
                textDecoration: 'underline',
                textUnderlineOffset: '12px',
              }}
            >
              GOOD.
            </span>
          </h2>

          <div style={{ marginTop: '56px' }}>
            <Link
              to="/start"
              className="btn-raw-solid"
              style={{
                backgroundColor: '#0B0B0B',
                color: '#C7FF32',
                padding: '20px 48px',
                fontSize: '15px',
                borderColor: '#0B0B0B',
              }}
              onMouseEnter={() => setCursor('start')}
              onMouseLeave={() => setCursor('default')}
            >
              START A PROJECT ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 860px) {
          .project-row {
            grid-template-columns: 36px 1fr !important;
            gap: 12px !important;
          }
          .process-teaser-grid,
          .about-teaser-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
