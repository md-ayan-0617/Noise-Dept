import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudioStore } from '../store/useStudioStore';

export const Start: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    email: '',
    projectType: 'Website',
    problem: '',
    priority: 'Brand',
    budget: '$20k – $40k',
    targetDate: 'Q4 2026',
    notes: '',
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation checks per step
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setErrorMessage('PLEASE PROVIDE YOUR NAME BEFORE PROCEEDING.');
        return;
      }
      if (!formData.brand.trim()) {
        setErrorMessage('PLEASE PROVIDE YOUR COMPANY OR BRAND NAME.');
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMessage('PLEASE PROVIDE A VALID WORK EMAIL ADDRESS.');
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.problem.trim() || formData.problem.trim().length < 10) {
        setErrorMessage('PLEASE DESCRIBE THE PROBLEM OR GOAL (AT LEAST 10 CHARACTERS).');
        return;
      }
    }

    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Simulate real submission
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsCompleted(true);
      }, 700);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#C7FF32',
        color: '#0B0B0B',
        minHeight: '100vh',
        paddingTop: '110px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 32px 120px 32px' }}>
        {/* Step Indicator Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '2px solid #0B0B0B',
            paddingBottom: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          <span>BRIEF GENERATOR // STAGE 0{currentStep} OF 07</span>
          <span>{isCompleted ? 'TRANSMISSION STAGED' : isSubmitting ? 'DISPATCHING...' : 'AWAITING DISPATCH'}</span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 8vw, 120px)',
            fontWeight: 900,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: '32px 0 36px 0',
          }}
        >
          TELL US <br />
          WHAT'S BROKEN.
        </h1>

        {/* Validation Error Banner */}
        {errorMessage && (
          <div
            role="alert"
            style={{
              backgroundColor: '#EC3D31',
              color: '#FFFFFF',
              padding: '14px 20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: '32px',
              border: '2px solid #0B0B0B',
              boxShadow: '4px 4px 0px #0B0B0B',
            }}
          >
            [ ERROR // {errorMessage} ]
          </div>
        )}

        {!isCompleted ? (
          <form onSubmit={handleNext}>
            {/* STEP 01: IDENTITY */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '720px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700 }}>
                  01 // WHO ARE YOU?
                </div>

                <div>
                  <label htmlFor="name-input" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '8px', fontWeight: 700 }}>
                    YOUR NAME *
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setErrorMessage(null);
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    placeholder="e.g. Alex Thorne"
                    style={{ width: '100%', padding: '16px', fontSize: '18px', border: '2px solid #0B0B0B', background: '#fff', fontFamily: 'var(--font-mono)' }}
                  />
                </div>

                <div>
                  <label htmlFor="brand-input" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '8px', fontWeight: 700 }}>
                    BRAND / COMPANY / PROJECT *
                  </label>
                  <input
                    id="brand-input"
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => {
                      setErrorMessage(null);
                      setFormData({ ...formData, brand: e.target.value });
                    }}
                    placeholder="e.g. Obscura Audio"
                    style={{ width: '100%', padding: '16px', fontSize: '18px', border: '2px solid #0B0B0B', background: '#fff', fontFamily: 'var(--font-mono)' }}
                  />
                </div>

                <div>
                  <label htmlFor="email-input" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '8px', fontWeight: 700 }}>
                    WORK EMAIL *
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setErrorMessage(null);
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    placeholder="alex@obscura.studio"
                    style={{ width: '100%', padding: '16px', fontSize: '18px', border: '2px solid #0B0B0B', background: '#fff', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 02: WHAT ARE WE MAKING? */}
            {currentStep === 2 && (
              <div style={{ maxWidth: '800px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
                  02 // WHAT ARE WE MAKING?
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {['Website', 'E-commerce', 'Digital Product', 'Custom Software', 'Interactive Campaign', 'Not Sure Yet'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      style={{
                        padding: '24px 16px',
                        backgroundColor: formData.projectType === type ? '#0B0B0B' : '#fff',
                        color: formData.projectType === type ? '#C7FF32' : '#0B0B0B',
                        border: '2px solid #0B0B0B',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {formData.projectType === type ? '✓ ' : '+ '}
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 03: THE PROBLEM */}
            {currentStep === 3 && (
              <div style={{ maxWidth: '780px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>
                  03 // WHAT'S THE PROBLEM? (OR AMBITION) *
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', marginBottom: '16px' }}>
                  Don’t write corporate speak. Tell us what is currently falling short or what you want people to feel.
                </p>
                <textarea
                  rows={6}
                  required
                  value={formData.problem}
                  onChange={(e) => {
                    setErrorMessage(null);
                    setFormData({ ...formData, problem: e.target.value });
                  }}
                  placeholder="e.g. Our current storefront looks like every standard Shopify theme and our bounce rate is 64%. We need an interface that feels like our actual clothes."
                  style={{ width: '100%', padding: '16px', fontSize: '18px', border: '2px solid #0B0B0B', background: '#fff', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            )}

            {/* STEP 04: WHAT MATTERS MOST? */}
            {currentStep === 4 && (
              <div style={{ maxWidth: '800px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
                  04 // WHAT MATTERS MOST TO SUCCESS?
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {['Brand Reputation', 'Direct Sales & Conversion', 'Interaction & Craft', 'Speed & Performance', 'Internal Autonomy', 'Cultural Noise'].map((prio) => (
                    <button
                      type="button"
                      key={prio}
                      onClick={() => setFormData({ ...formData, priority: prio })}
                      style={{
                        padding: '24px 16px',
                        backgroundColor: formData.priority === prio ? '#0B0B0B' : '#fff',
                        color: formData.priority === prio ? '#C7FF32' : '#0B0B0B',
                        border: '2px solid #0B0B0B',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {formData.priority === prio ? '✓ ' : '+ '}
                      {prio}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 05: BUDGET */}
            {currentStep === 5 && (
              <div style={{ maxWidth: '800px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
                  05 // BUDGET RANGE
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {['$15k – $25k', '$25k – $50k', '$50k – $90k', '$90k+'].map((range) => (
                    <button
                      type="button"
                      key={range}
                      onClick={() => setFormData({ ...formData, budget: range })}
                      style={{
                        padding: '24px 16px',
                        backgroundColor: formData.budget === range ? '#0B0B0B' : '#fff',
                        color: formData.budget === range ? '#C7FF32' : '#0B0B0B',
                        border: '2px solid #0B0B0B',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '15px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 06: TARGET DATE */}
            {currentStep === 6 && (
              <div style={{ maxWidth: '720px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
                  06 // TARGET LAUNCH TIMEFRAME
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  {['Q4 2026', 'Q1 2027', 'Q2 2027', 'Flexible / Quality First'].map((date) => (
                    <button
                      type="button"
                      key={date}
                      onClick={() => setFormData({ ...formData, targetDate: date })}
                      style={{
                        padding: '20px',
                        backgroundColor: formData.targetDate === date ? '#0B0B0B' : '#fff',
                        color: formData.targetDate === date ? '#C7FF32' : '#0B0B0B',
                        border: '2px solid #0B0B0B',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 07: ANYTHING ELSE? */}
            {currentStep === 7 && (
              <div style={{ maxWidth: '780px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>
                  07 // ANYTHING ELSE TO INCLUDE?
                </div>
                <textarea
                  rows={5}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Links to references, weird requirements, Figma files, or specific non-negotiables."
                  style={{ width: '100%', padding: '16px', fontSize: '18px', border: '2px solid #0B0B0B', background: '#fff', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            )}

            {/* Form Controls */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '48px', alignItems: 'center' }}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setCurrentStep((prev) => prev - 1);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#0B0B0B',
                    border: '2px solid #0B0B0B',
                    padding: '16px 28px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  ← BACK
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#0B0B0B',
                  color: '#C7FF32',
                  border: '2px solid #0B0B0B',
                  padding: '16px 36px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onMouseEnter={() => setCursor('start')}
                onMouseLeave={() => setCursor('default')}
              >
                {isSubmitting
                  ? '[ TRANSMITTING BUFFER... ]'
                  : currentStep === 7
                  ? 'TRANSMIT BRIEF →'
                  : 'NEXT STEP →'}
              </button>
            </div>
          </form>
        ) : (
          /* COMPLETION VIEW */
          <div style={{ maxWidth: '800px', border: '2px solid #0B0B0B', backgroundColor: '#fff', padding: '48px', boxShadow: '12px 12px 0px #0B0B0B' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#EC3D31', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '16px' }}>
              // DISPATCH ACKNOWLEDGED
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6vw, 76px)',
                fontWeight: 900,
                lineHeight: 0.95,
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              GOT IT. <br />
              WE'LL READ <br />
              EVERY WORD.
            </h2>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', marginTop: '24px', lineHeight: 1.5, color: '#333' }}>
              Thanks, {formData.name || 'there'}. We review every project inquiry personally. You will receive a direct reply from our design & engineering team within 24 business hours.
            </p>

            <div style={{ marginTop: '36px', display: 'flex', gap: '20px' }}>
              <Link to="/" className="btn-raw-solid" style={{ backgroundColor: '#0B0B0B', color: '#C7FF32' }}>
                RETURN HOME
              </Link>
              <Link to="/work" className="btn-raw" style={{ borderColor: '#0B0B0B', color: '#0B0B0B' }}>
                BROWSE ARCHIVE
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
