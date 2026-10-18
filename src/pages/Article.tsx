import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';
import { notesData } from '../data/notes';

export const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setCursor } = useStudioStore();
  const [readProgress, setReadProgress] = useState(0);

  const note = notesData.find((n) => n.slug === slug);
  if (!note) {
    return <Navigate to="/notes" replace />;
  }

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.max(0, Math.min(100, (window.scrollY / scrollHeight) * 100));
        setReadProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#E8E6DF', minHeight: '100vh', paddingTop: '110px' }}>
      {/* Sticky Top Reading Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${readProgress}%`,
          height: '3px',
          backgroundColor: '#C7FF32',
          zIndex: 99999,
          transition: 'width 0.1s ease',
        }}
      />

      <article style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(36px, 5vw, 60px) var(--pad-section-x) clamp(60px, 10vw, 120px) var(--pad-section-x)' }}>
        {/* Back Link */}
        <Link
          to="/notes"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#777',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            display: 'inline-block',
            marginBottom: '28px',
          }}
          onMouseEnter={() => setCursor('default')}
        >
          ← BACK TO WORKING NOTES
        </Link>

        {/* Article Header */}
        <div style={{ borderBottom: '1px solid rgba(232, 230, 223, 0.15)', paddingBottom: 'clamp(24px, 3.5vw, 40px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#C7FF32', marginBottom: '16px' }}>
            <span>{note.number}</span>
            <span>// {note.category}</span>
            <span>// {note.date}</span>
            <span>// {note.readTime} READ</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 6vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              margin: '0 0 clamp(20px, 3vw, 32px) 0',
            }}
          >
            {note.title}
          </h1>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(17px, 1.8vw, 26px)', lineHeight: 1.45, color: '#aaa', maxWidth: '900px' }}>
            {note.content.intro}
          </p>
        </div>

        {/* Content Layout with Desktop Sticky TOC */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(200px, 280px) minmax(0, 1fr)',
            gap: 'clamp(32px, 4vw, 64px)',
            paddingTop: 'clamp(32px, 4vw, 60px)',
            alignItems: 'flex-start',
          }}
          className="article-layout"
        >
          {/* Sticky Table of Contents */}
          <aside
            style={{
              position: 'sticky',
              top: '120px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              borderLeft: '1px solid rgba(232, 230, 223, 0.15)',
              paddingLeft: '20px',
            }}
            className="sticky-toc"
          >
            <div style={{ color: '#777', marginBottom: '12px', letterSpacing: '0.1em' }}>TABLE OF CONTENTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {note.content.sections.map((sec, idx) => (
                <a
                  key={idx}
                  href={`#sec-${idx}`}
                  style={{ color: '#E8E6DF', textDecoration: 'none', lineHeight: 1.4 }}
                >
                  {sec.heading}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Body Content */}
          <div style={{ maxWidth: '820px', minWidth: 0, width: '100%' }}>
            {note.content.sections.map((sec, idx) => (
              <section key={idx} id={`sec-${idx}`} style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3.2vw, 44px)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  {sec.heading}
                </h2>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.7, color: '#ccc' }}>
                  {sec.body}
                </p>

                {/* Pull Quote if available */}
                {sec.pullQuote && (
                  <blockquote
                    style={{
                      borderLeft: '3px solid #C7FF32',
                      paddingLeft: 'clamp(14px, 2vw, 24px)',
                      margin: 'clamp(24px, 3vw, 36px) 0',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(20px, 2.4vw, 34px)',
                      fontWeight: 800,
                      lineHeight: 1.25,
                      color: '#E8E6DF',
                      textTransform: 'uppercase',
                    }}
                  >
                    "{sec.pullQuote}"
                  </blockquote>
                )}

                {/* Code block if available */}
                {sec.code && (
                  <pre
                    style={{
                      backgroundColor: '#141414',
                      border: '1px solid rgba(232, 230, 223, 0.15)',
                      padding: 'clamp(14px, 2vw, 20px)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(11px, 1.5vw, 13px)',
                      color: '#C7FF32',
                      overflowX: 'auto',
                      maxWidth: '100%',
                      margin: '24px 0',
                      lineHeight: 1.5,
                      boxSizing: 'border-box',
                    }}
                  >
                    <code>{sec.code}</code>
                  </pre>
                )}
              </section>
            ))}

            {/* Author Sign-Off */}
            <div
              style={{
                borderTop: '1px solid rgba(232, 230, 223, 0.15)',
                paddingTop: '28px',
                marginTop: 'clamp(36px, 5vw, 60px)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#777',
              }}
            >
              <div>WRITTEN BY NOISE DEPT. ARCHITECTURE TEAM</div>
              <div style={{ marginTop: '6px', wordBreak: 'break-all' }}>QUESTIONS OR REBUTTALS? DISPATCH VIA HELLO@NOISEDEPT.STUDIO</div>
            </div>
          </div>
        </div>
      </article>

      <style>{`
        @media (max-width: 900px) {
          .article-layout {
            grid-template-columns: 1fr !important;
          }
          .sticky-toc {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
