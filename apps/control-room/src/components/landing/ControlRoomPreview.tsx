import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ExternalLink, 
  Activity, 
  Terminal, 
  Zap
} from 'lucide-react';
import { ProviderLogo } from '../ProviderLogo';

interface ControlRoomPreviewProps {
  onLaunchControlRoom: () => void;
}

export const ControlRoomPreview: React.FC<ControlRoomPreviewProps> = ({ onLaunchControlRoom }) => {
  const [intervened, setIntervened] = useState(false);
  const [previewTab, setPreviewTab] = useState<'overview' | 'watchdog' | 'ast'>('overview');

  return (
    <section id="control-room" className="as-editorial-section as-preview-section">
      <div className="as-container">
        {/* Section Header */}
        <div className="as-editorial-header">
          <div className="as-mono-tag">
            <span>[ OPERATIONAL SURFACE // REAL-TIME CONTROL PLANE ]</span>
          </div>
          <h2 className="as-editorial-title">
            Inside the Control Room
          </h2>
          <p className="as-editorial-sub">
            The mission operations center for autonomous software development. Telemetry, event streams, watchdog intercepts, and cross-agent memory in a single pane of glass.
          </p>
        </div>

        {/* Large Cinematic Desktop Application Frame */}
        <div className="as-app-showcase">
          {/* macOS Desktop Chrome Bar */}
          <div className="as-app-chrome">
            <div className="as-chrome-left">
              <div className="as-chrome-dots">
                <span className="as-dot red" />
                <span className="as-dot yellow" />
                <span className="as-dot green" />
              </div>
              <span className="as-chrome-title">AI Supervisor — Mission Control Room (Local Desktop Engine)</span>
            </div>
            <div className="as-chrome-right">
              <div className="as-chrome-badge">
                <span className="as-pulse-indicator" />
                <span>WS: 127.0.0.1:8000 (3ms)</span>
              </div>
              <button 
                onClick={onLaunchControlRoom}
                className="as-chrome-launch-btn"
                title="Open the real live Control Room application"
              >
                <span>Launch Live App</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>

          {/* App Workspace Canvas */}
          <div className="as-app-workspace">
            {/* Left Operational Sidebar */}
            <div className="as-app-sidebar">
              <div className="as-sidebar-brand">
                <div className="as-sidebar-logo" />
                <span>AI SUPERVISOR</span>
              </div>

              <div className="as-sidebar-nav">
                <button 
                  className={`as-sidebar-nav-item ${previewTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setPreviewTab('overview')}
                >
                  <Activity size={14} />
                  <span>Mission Telemetry</span>
                </button>
                <button 
                  className={`as-sidebar-nav-item ${previewTab === 'watchdog' ? 'active' : ''}`}
                  onClick={() => setPreviewTab('watchdog')}
                >
                  <ShieldAlert size={14} />
                  <span>Watchdog Rules</span>
                </button>
                <button 
                  className={`as-sidebar-nav-item ${previewTab === 'ast' ? 'active' : ''}`}
                  onClick={() => setPreviewTab('ast')}
                >
                  <Terminal size={14} />
                  <span>AST Scope Diffs</span>
                </button>
              </div>

              <div className="as-sidebar-footer">
                <span className="as-sidebar-version">v1.2.0 • SQLite WAL</span>
                <span className="as-sidebar-status">12 Rules Armed</span>
              </div>
            </div>

            {/* Main Application Telemetry Board */}
            <div className="as-app-main">
              {/* Top Mission Banner */}
              <div className="as-mission-banner">
                <div className="as-mission-info">
                  <div className="as-mission-title-row">
                    <span className="as-mission-id">#msn-489</span>
                    <h3 className="as-mission-title">Migrate Auth Layer to Asymmetric Key Signatures</h3>
                    <span className="as-mission-status-pill">RUNNING</span>
                  </div>
                  <div className="as-mission-meta">
                    <span>Target: <code>src/auth/*</code></span>
                    <span>•</span>
                    <span>Cost: $1.28 / $8.00 Bounded</span>
                    <span>•</span>
                    <span>Invariants: 3 Armed</span>
                  </div>
                </div>

                <div className="as-mission-actions">
                  <button 
                    className={`as-sim-btn ${intervened ? 'intervened' : ''}`}
                    onClick={() => setIntervened(!intervened)}
                    title="Simulate what happens when an agent loops or breaches boundaries"
                  >
                    <Zap size={13} />
                    <span>{intervened ? 'Reset Simulation' : 'Simulate Loop Intercept'}</span>
                  </button>
                </div>
              </div>

              {/* Intercept Alert Banner if Triggered */}
              {intervened && (
                <div className="as-intervention-banner">
                  <div className="as-intervention-icon">
                    <ShieldAlert size={16} color="#F59E0B" />
                  </div>
                  <div className="as-intervention-text">
                    <strong>WATCHDOG CIRCUIT BREAKER ENGAGED:</strong> Repeated failure signature detected (2x on line 42). Worker frozen. Worktree rolled back to clean commit <code>SHA 8fa31b</code>. Disproven approach stored in memory.
                  </div>
                  <button 
                    className="as-intervention-dismiss"
                    onClick={() => setIntervened(false)}
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Multi-Agent Active Fleet Grid */}
              <div className="as-fleet-strip">
                <div className="as-agent-telemetry-card active">
                  <div className="as-card-top">
                    <div className="as-agent-brand">
                      <ProviderLogo providerId="claude_code" size={18} />
                      <span className="as-agent-title">Claude Code</span>
                    </div>
                    <span className="as-badge running">EXECUTING</span>
                  </div>
                  <div className="as-card-detail">
                    <span>Task: <code>01-keygen.py</code></span>
                    <span>Tokens: 18.4k • 230ms avg</span>
                  </div>
                  <div className="as-progress-bar">
                    <div className="as-progress-fill" style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="as-agent-telemetry-card standby">
                  <div className="as-card-top">
                    <div className="as-agent-brand">
                      <ProviderLogo providerId="codex" size={18} />
                      <span className="as-agent-title">OpenAI Codex</span>
                    </div>
                    <span className="as-badge standby">STANDBY</span>
                  </div>
                  <div className="as-card-detail">
                    <span>Role: Secondary Fallback</span>
                    <span>Task: <code>02-tokens.sql</code> ready</span>
                  </div>
                  <div className="as-progress-bar">
                    <div className="as-progress-fill" style={{ width: '0%' }} />
                  </div>
                </div>

                <div className="as-agent-telemetry-card verified">
                  <div className="as-card-top">
                    <div className="as-agent-brand">
                      <ProviderLogo providerId="gemini" size={18} />
                      <span className="as-agent-title">Gemini CLI</span>
                    </div>
                    <span className="as-badge verified">COMPLETED</span>
                  </div>
                  <div className="as-card-detail">
                    <span>Task: Architecture DAG</span>
                    <span>Duration: 4.2s • Verified</span>
                  </div>
                  <div className="as-progress-bar">
                    <div className="as-progress-fill verified" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Streaming Real-Time Mission Terminal */}
              <div className="as-app-terminal">
                <div className="as-terminal-header">
                  <div className="as-terminal-tab">
                    <Terminal size={13} />
                    <span>Real-Time Supervisory Stream (supervisor_events.jsonl)</span>
                  </div>
                  <span className="as-terminal-indicator">LIVE STREAM</span>
                </div>
                <div className="as-terminal-feed">
                  <div className="as-feed-row">
                    <span className="as-feed-time">14:51:02</span>
                    <span className="as-feed-tag info">DISPATCH</span>
                    <span className="as-feed-msg">Task 01 dispatched to ClaudeCodeAdapter in isolated worktree <code>.supervisor/wt-1</code></span>
                  </div>
                  <div className="as-feed-row">
                    <span className="as-feed-time">14:51:04</span>
                    <span className="as-feed-tag pass">AST_CHECK</span>
                    <span className="as-feed-msg">AST diff parsed: 2 functions added in <code>src/auth/crypto.py</code> • Invariants preserved</span>
                  </div>
                  <div className="as-feed-row">
                    <span className="as-feed-time">14:51:07</span>
                    <span className="as-feed-tag pass">VERIFY</span>
                    <span className="as-feed-msg">Air-gapped Sandbox executed: <code>pytest tests/test_auth.py</code> • 14 passed (0.8s)</span>
                  </div>
                  {intervened && (
                    <div className="as-feed-row alert">
                      <span className="as-feed-time">14:51:10</span>
                      <span className="as-feed-tag warn">CIRCUIT_BREAKER</span>
                      <span className="as-feed-msg">Watchdog intercepted repeated error signature • Worker halted • Clean rollback executed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Floating Annotation Badges */}
          <div className="as-showcase-annotations">
            <div className="as-annotation-item">
              <span className="as-annotation-dot" />
              <span>Multi-Agent Fleet Coordination</span>
            </div>
            <div className="as-annotation-item">
              <span className="as-annotation-dot" />
              <span>Watchdog Circuit Breakers</span>
            </div>
            <div className="as-annotation-item">
              <span className="as-annotation-dot" />
              <span>Deterministic Air-Gapped Verification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
