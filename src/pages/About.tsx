import React from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { aboutData } from '../data/about';
import { NoiseImage } from '../components/NoiseImage';

export const About: React.FC = () => {
  const { setCursor } = useStudioStore();

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', minHeight: '100vh', paddingTop: '110px' }}>

      {/* =====================================================
          ABOUT HERO (No Account Managers)
          ===================================================== */}
      <section style={{ padding: '60px 32px 80px 32px', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C7FF32', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // STUDIO PROFILE & PHILOSOPHY
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 11vw, 175px)',
            fontWeight: 900,
            lineHeight: 0.88,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          {aboutData.heroTitle} <br />
          <span style={{ color: '#777' }}>JUST THE PEOPLE</span> <br />
          MAKING THE WORK.
        </h1>
      </section>

      {/* =====================================================
          DIRECT-FLASH PORTRAIT & HONEST BIO
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px 100px 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.4fr)',
            gap: '64px',
            alignItems: 'flex-start',
            borderBottom: '1px solid rgba(232, 230, 223, 0.15)',
            paddingBottom: '80px',
          }}
          className="about-bio-grid"
        >
          {/* Portrait with Direct Flash Crop */}
          <div
            style={{
              border: '2px solid rgba(232, 230, 223, 0.25)',
              backgroundColor: '#151515',
              boxShadow: '16px 16px 0px #EC3D31',
              position: 'relative',
              overflow: 'hidden',
              height: '560px',
            }}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={() => setCursor('default')}
          >
            <NoiseImage
              src={aboutData.portraitUrl}
              alt="Studio Leadership"
              fallbackTitle="LEADERSHIP"
              fallbackSubtitle="DIRECT_FLASH"
              accentColor="#EC3D31"
              grayscaleByDefault={false}
              style={{ width: '100%', height: '100%' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                backgroundColor: '#0B0B0B',
                color: '#EC3D31',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              DIRECT_FLASH // CANON 35MM
            </div>
          </div>

          {/* Conversational Bio Copy */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {aboutData.studioBio.map((paragraph, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(18px, 1.8vw, 24px)',
                    lineHeight: 1.55,
                    color: i === 0 ? '#E8E6DF' : '#aaa',
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div style={{ marginTop: '40px' }}>
              <Link to="/start" className="btn-raw-solid" onMouseEnter={() => setCursor('start')} onMouseLeave={() => setCursor('default')}>
                START A DIRECT CONVERSATION ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          5 STUDIO VALUES
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px 100px 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C7FF32', letterSpacing: '0.15em', marginBottom: '24px' }}>
          // OPERATING PRINCIPLES
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 48px 0' }}>
          VALUES WE ACTUALLY KEEP.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {aboutData.values.map((val) => (
            <div
              key={val.number}
              style={{
                border: '1px solid rgba(232, 230, 223, 0.15)',
                padding: '32px',
                backgroundColor: '#121212',
                display: 'grid',
                gridTemplateColumns: 'minmax(40px, 60px) minmax(280px, 1.2fr) minmax(300px, 2fr)',
                gap: '24px',
                alignItems: 'baseline',
              }}
              className="values-grid-row"
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#EC3D31', fontWeight: 700 }}>
                {val.number}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
                {val.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: '#aaa', margin: 0, lineHeight: 1.5 }}>
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          PERSONAL INTEREST WALL (Visual Fragments)
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px 100px 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#777', letterSpacing: '0.15em', marginBottom: '16px' }}>
          // PHYSICAL ARTIFACTS & INFLUENCES
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 40px 0' }}>
          THE DESK ARCHIVE.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {aboutData.personalInterests.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid rgba(232, 230, 223, 0.15)',
                backgroundColor: '#151515',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setCursor('view')}
              onMouseLeave={() => setCursor('default')}
            >
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <NoiseImage
                  src={item.image}
                  alt={item.name}
                  fallbackTitle={item.name}
                  fallbackSubtitle={item.tag}
                  accentColor="#EC3D31"
                  grayscaleByDefault={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div style={{ padding: '16px', fontFamily: 'var(--font-mono)' }}>
                <div style={{ fontSize: '10px', color: '#C7FF32' }}>{item.tag}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#E8E6DF', marginTop: '4px' }}>
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          STUDIO TOOLBOX (Design, Dev, Infra)
          ===================================================== */}
      <section style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 32px 120px 32px' }}>
        <div style={{ borderTop: '1px solid rgba(232, 230, 223, 0.15)', paddingTop: '48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#777', letterSpacing: '0.15em', marginBottom: '24px' }}>
            // TECHNICAL TOOLBOX
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#EC3D31', marginBottom: '16px' }}>
                DESIGN
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {aboutData.toolbox.design.map((t, idx) => (
                  <span key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', background: '#1c1c1c', padding: '6px 12px', border: '1px solid #333' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#C7FF32', marginBottom: '16px' }}>
                DEVELOPMENT
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {aboutData.toolbox.development.map((t, idx) => (
                  <span key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', background: '#1c1c1c', padding: '6px 12px', border: '1px solid #333' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#3155FF', marginBottom: '16px' }}>
                INFRASTRUCTURE
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {aboutData.toolbox.infrastructure.map((t, idx) => (
                  <span key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', background: '#1c1c1c', padding: '6px 12px', border: '1px solid #333' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-bio-grid,
          .values-grid-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
