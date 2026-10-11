import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingNavProps {
  onLaunchControlRoom: () => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({ onLaunchControlRoom }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="as-nav-wrapper">
      <nav className="as-nav" aria-label="Main Navigation">
        {/* Brand */}
        <a href="#hero" className="as-nav-brand" onClick={(e) => handleScroll(e, 'hero')}>
          <div className="as-nav-brand-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M3 12h3m12 0h3M12 3v3m0 12v3" />
              <path d="m5.6 5.6 2.2 2.2m8.4 8.4 2.2 2.2m0-12.8-2.2 2.2m-8.4 8.4-2.2 2.2" />
            </svg>
          </div>
          <span>AI Supervisor</span>
        </a>

        {/* Section Links */}
        <div className="as-nav-links">
          <a
            href="#problem"
            className="as-nav-link"
            onClick={(e) => handleScroll(e, 'problem')}
          >
            The Problem
          </a>
          <a
            href="#how-it-works"
            className="as-nav-link"
            onClick={(e) => handleScroll(e, 'how-it-works')}
          >
            How It Works
          </a>
          <a
            href="#control-room"
            className="as-nav-link"
            onClick={(e) => handleScroll(e, 'control-room')}
          >
            Control Room
          </a>
          <a
            href="#verification"
            className="as-nav-link"
            onClick={(e) => handleScroll(e, 'verification')}
          >
            Verification
          </a>
        </div>

        {/* Action CTAs */}
        <div className="as-nav-actions">
          <a
            href="https://github.com/M0izz/AI-Supervisior"
            target="_blank"
            rel="noopener noreferrer"
            className="as-btn as-btn-secondary as-btn-sm"
            aria-label="GitHub Repository"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          <button
            onClick={onLaunchControlRoom}
            className="as-btn as-btn-primary as-btn-sm"
          >
            <span>Launch Control Room</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </nav>
    </header>
  );
};
