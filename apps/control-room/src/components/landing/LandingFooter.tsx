import React from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';

interface LandingFooterProps {
  onLaunchControlRoom: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onLaunchControlRoom }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Section F — Final CTA */}
      <section className="as-final-cta-section">
        <div className="as-final-cta-card">
          <span className="as-section-tag">Start Supervising</span>
          <h2 className="as-final-headline">
            Put your AI agents to work.<br />
            Keep them accountable.
          </h2>
          <p className="as-final-desc">
            Coordinate execution, preserve context across model handoffs, and make verified outcomes the standard for autonomous engineering.
          </p>
          <div className="as-hero-cta-group" style={{ marginBottom: 0 }}>
            <button
              onClick={onLaunchControlRoom}
              className="as-btn as-btn-primary"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              <span>Launch Control Room</span>
              <ArrowRight size={15} />
            </button>
            <a
              href="#how-it-works"
              onClick={(e) => handleScrollTo(e, 'how-it-works')}
              className="as-btn as-btn-secondary"
              style={{ padding: '12px 24px', fontSize: '14px' }}
            >
              <span>Explore Architecture</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="as-footer">
        <div className="as-footer-content">
          <div className="as-footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="as-nav-brand-icon" style={{ width: '22px', height: '22px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 12h3m12 0h3M12 3v3m0 12v3" />
                </svg>
              </div>
              <span className="as-footer-brand-title">AI Supervisor</span>
            </div>
            <p className="as-footer-brand-desc">
              Supervision and coordination layer for autonomous AI coding agents. One mission. Any supported agent. One supervisor.
            </p>
          </div>

          <div className="as-footer-links">
            <a
              href="#problem"
              className="as-footer-link"
              onClick={(e) => handleScrollTo(e, 'problem')}
            >
              The Problem
            </a>
            <a
              href="#how-it-works"
              className="as-footer-link"
              onClick={(e) => handleScrollTo(e, 'how-it-works')}
            >
              How It Works
            </a>
            <a
              href="#control-room"
              className="as-footer-link"
              onClick={(e) => handleScrollTo(e, 'control-room')}
            >
              Control Room
            </a>
            <a
              href="#verification"
              className="as-footer-link"
              onClick={(e) => handleScrollTo(e, 'verification')}
            >
              Verification
            </a>
            <a
              href="https://github.com/M0izz/AI-Supervisior"
              target="_blank"
              rel="noopener noreferrer"
              className="as-footer-link"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
            <button
              onClick={scrollToTop}
              className="as-footer-link"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              title="Scroll to top"
            >
              <ArrowUp size={14} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
