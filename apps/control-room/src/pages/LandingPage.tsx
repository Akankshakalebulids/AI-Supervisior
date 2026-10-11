import React from 'react';
import '../landing.css';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroConstellation } from '../components/landing/HeroConstellation';
import { ProblemSection } from '../components/landing/ProblemSection';
import { SupervisionWorkflow } from '../components/landing/SupervisionWorkflow';
import { ControlRoomPreview } from '../components/landing/ControlRoomPreview';
import { VerificationSection } from '../components/landing/VerificationSection';
import { LandingFooter } from '../components/landing/LandingFooter';
import { ArrowRight, ChevronDown, Cpu, ShieldCheck, Terminal } from 'lucide-react';

interface LandingPageProps {
  onStartSupervising: () => void;
  onRunDemo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartSupervising,
  onRunDemo
}) => {
  const handleScrollToWorkflow = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="as-landing" id="hero">
      {/* Reference-inspired background with dot-matrix grid and radial lighting */}
      <div className="as-landing-bg" />

      {/* Floating Glassmorphic Pill Header */}
      <LandingNav onLaunchControlRoom={onStartSupervising} />

      {/* SECTION A — HERO SECTION (SIGNATURE CIRCULAR AGENT CONSTELLATION) */}
      <section className="as-hero-section">
        {/* Dynamic Blooming & Floating Circular Agent Constellation */}
        <HeroConstellation />

        <div className="as-hero-container">
          {/* Status Pill */}
          <div className="as-pill">
            <span className="as-pulse-dot" />
            <span>The Supervisory Layer for Autonomous AI Coding</span>
          </div>

          {/* Primary Headline */}
          <h1 className="as-hero-headline">
            Your AI agents work.<br />
            <span className="as-highlight">Make sure they finish the job.</span>
          </h1>

          {/* Supporting Headline */}
          <p className="as-hero-supporting">
            One mission. Any supported agent. One supervisor.
          </p>

          {/* Supporting Description */}
          <p className="as-hero-desc">
            AI Supervisor coordinates your coding agents, monitors their execution, detects when work goes off track, preserves context across handoffs, and independently verifies the result.
          </p>

          {/* CTA Buttons */}
          <div className="as-hero-cta-group">
            <button
              onClick={onStartSupervising}
              className="as-btn as-btn-primary"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              <span>Launch Control Room</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={handleScrollToWorkflow}
              className="as-btn as-btn-secondary"
              style={{ padding: '12px 24px', fontSize: '14px' }}
            >
              <span>See How It Works</span>
              <ChevronDown size={15} />
            </button>

            {onRunDemo && (
              <button
                onClick={onRunDemo}
                className="as-btn as-btn-secondary"
                style={{ padding: '12px 20px', fontSize: '13px' }}
                title="Launch an interactive demo scenario in the Control Room"
              >
                <span>Run Demo Mission</span>
              </button>
            )}
          </div>

          {/* Feature Badges */}
          <div className="as-hero-pills">
            <div className="as-hero-badge">
              <Cpu size={14} />
              <span>Multi-Agent Fleet Coordination</span>
            </div>
            <div className="as-hero-badge">
              <Terminal size={14} />
              <span>Real-Time Watchdog Circuit Breakers</span>
            </div>
            <div className="as-hero-badge">
              <ShieldCheck size={14} />
              <span>Independent Sandbox Verification</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B — THE PROBLEM */}
      <ProblemSection />

      {/* SECTION C — HOW SUPERVISION WORKS */}
      <SupervisionWorkflow />

      {/* SECTION D — INSIDE THE CONTROL ROOM */}
      <ControlRoomPreview onLaunchControlRoom={onStartSupervising} />

      {/* SECTION E — VERIFICATION */}
      <VerificationSection />

      {/* SECTION F — FINAL CTA & FOOTER */}
      <LandingFooter onLaunchControlRoom={onStartSupervising} />
    </div>
  );
};

export default LandingPage;
