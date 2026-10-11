import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ProviderLogo } from '../ProviderLogo';

interface ControlRoomPreviewProps {
  onLaunchControlRoom: () => void;
}

export const ControlRoomPreview: React.FC<ControlRoomPreviewProps> = ({ onLaunchControlRoom }) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'fleet' | 'events'>('mission');

  return (
    <section id="control-room" className="as-section">
      <div className="as-section-header">
        <span className="as-section-tag">Interactive Interface</span>
        <h2 className="as-section-title">
          Inside the Control Room
        </h2>
        <p className="as-section-desc">
          Unified command center providing real-time mission state, multi-agent fleet telemetry, watchdog loop diagnostics, and cryptographic verification reports.
        </p>
      </div>

      <div className="as-preview-card">
        {/* Mock Topbar matching actual Control Room layout */}
        <div className="as-preview-topbar">
          <div className="as-preview-controls">
            <span className="as-preview-dot" style={{ backgroundColor: '#ef4444' }} />
            <span className="as-preview-dot" style={{ backgroundColor: '#f59e0b' }} />
            <span className="as-preview-dot" style={{ backgroundColor: '#22c55e' }} />
            <span className="as-preview-title" style={{ marginLeft: '12px' }}>
              AI Supervisor Control Room • Mission #msn-auth-jwt
            </span>
          </div>

          <div className="as-preview-tabs">
            <button
              className={`as-preview-tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              Mission DAG & Tasks
            </button>
            <button
              className={`as-preview-tab-btn ${activeTab === 'fleet' ? 'active' : ''}`}
              onClick={() => setActiveTab('fleet')}
            >
              Agent Fleet Matrix
            </button>
            <button
              className={`as-preview-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              Supervisory Watchdog Log
            </button>
          </div>
        </div>

        {/* Preview Content Body */}
        <div className="as-preview-body">
          {activeTab === 'mission' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--as-text-primary)' }}>
                    Mission: JWT Auth Layer Refactoring & Token Migration
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--as-text-muted)', marginTop: '4px' }}>
                    Status: <span style={{ color: 'var(--as-blue-ice)', fontWeight: 600 }}>RUNNING</span> • 3 of 4 Tasks Completed • Worktree Isolated
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '4px 10px', background: 'rgba(52, 120, 246, 0.15)', border: '1px solid rgba(52, 120, 246, 0.3)', borderRadius: '4px', color: 'var(--as-blue-ice)' }}>
                    Watchdog: ARMED
                  </span>
                </div>
              </div>

              {/* DAG Task List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                <div style={{ background: 'rgba(8, 13, 27, 0.8)', border: '1px solid var(--as-border-subtle)', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--as-text-muted)' }}>TASK 01</span>
                    <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>VERIFIED</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--as-text-primary)' }}>JWT Token Utilities</div>
                  <div style={{ fontSize: '11px', color: 'var(--as-text-secondary)', marginTop: '6px' }}>Assigned: Claude Code • tokens.py</div>
                </div>

                <div style={{ background: 'rgba(8, 13, 27, 0.8)', border: '1px solid var(--as-border-subtle)', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--as-text-muted)' }}>TASK 02</span>
                    <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>VERIFIED</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--as-text-primary)' }}>Refresh Token DB Schema</div>
                  <div style={{ fontSize: '11px', color: 'var(--as-text-secondary)', marginTop: '6px' }}>Assigned: Codex • 003_tokens.sql</div>
                </div>

                <div style={{ background: 'rgba(29, 59, 112, 0.3)', border: '1px solid var(--as-blue-bright)', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--as-blue-ice)' }}>TASK 03</span>
                    <span style={{ fontSize: '11px', color: 'var(--as-blue-bright)', fontWeight: 600 }}>IN PROGRESS</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--as-text-primary)' }}>Middleware Token Verification</div>
                  <div style={{ fontSize: '11px', color: 'var(--as-text-secondary)', marginTop: '6px' }}>Assigned: Claude Code • auth_middleware.py</div>
                </div>

                <div style={{ background: 'rgba(8, 13, 27, 0.6)', border: '1px solid var(--as-border-subtle)', borderRadius: '8px', padding: '14px', opacity: 0.7 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--as-text-muted)' }}>TASK 04</span>
                    <span style={{ fontSize: '11px', color: 'var(--as-text-muted)' }}>QUEUED</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--as-text-primary)' }}>End-to-End Regression Test</div>
                  <div style={{ fontSize: '11px', color: 'var(--as-text-secondary)', marginTop: '6px' }}>Assigned: Independent Verifier</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fleet' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--as-text-primary)' }}>
                Configured Agent Fleet & Universal Adapters
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {[
                  { id: 'claude_code', name: 'Claude Code', provider: 'Anthropic', model: 'Sonnet 3.7', status: 'RUNNING', role: 'Active Primary Worker' },
                  { id: 'codex', name: 'OpenAI Codex', provider: 'OpenAI', model: 'GPT-4o', status: 'IDLE', role: 'Fallback Handoff Specialist' },
                  { id: 'hermes', name: 'Hermes Agent', provider: 'Nous Research', model: 'Hermes-4-70B', status: 'IDLE', role: 'Long-running Session Worker' },
                  { id: 'digitalocean_managed', name: 'DO Managed Agent', provider: 'DigitalOcean', model: 'Gemma 4', status: 'READY', role: 'MicroVM Cloud Sandbox' },
                  { id: 'gemini', name: 'Gemini CLI', provider: 'Google', model: 'Gemini 2.5', status: 'READY', role: 'Diagnostic Planning' },
                  { id: 'qwen', name: 'Qwen Local', provider: 'Alibaba Cloud', model: 'Qwen 2.5 Coder', status: 'OFFLINE_READY', role: 'Local Air-gapped Fallback' }
                ].map(agent => (
                  <div
                    key={agent.id}
                    style={{
                      background: 'rgba(8, 13, 27, 0.8)',
                      border: '1px solid var(--as-border-subtle)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <ProviderLogo providerId={agent.id} size={28} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--as-text-primary)' }}>{agent.name}</div>
                        <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: agent.status === 'RUNNING' ? 'var(--as-blue-bright)' : 'var(--as-text-muted)' }}>
                          {agent.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--as-text-muted)' }}>{agent.provider} • {agent.model}</div>
                      <div style={{ fontSize: '11px', color: 'var(--as-blue-ice)', marginTop: '2px' }}>{agent.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--as-border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--as-text-muted)' }}>LIVE SUPERVISORY EVENT STREAM</span>
                <span style={{ color: 'var(--as-blue-bright)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="as-pulse-dot" style={{ width: '6px', height: '6px' }} />
                  WEBSOCKET CONNECTED
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '8px 12px', background: 'rgba(8, 13, 27, 0.7)', borderRadius: '6px', borderLeft: '3px solid var(--as-blue-electric)' }}>
                  <span style={{ color: 'var(--as-text-muted)' }}>[14:24:12]</span> <span style={{ color: 'var(--as-blue-ice)' }}>claude_code</span> :: ToolCall: EditFile("auth_middleware.py", lines 45-62)
                </div>
                <div style={{ padding: '8px 12px', background: 'rgba(8, 13, 27, 0.7)', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
                  <span style={{ color: 'var(--as-text-muted)' }}>[14:24:16]</span> <span style={{ color: '#f59e0b' }}>[WATCHDOG INTERVENTION]</span> Loop threshold 2 detected on test assertion. Agent requested auto-recovery strategy.
                </div>
                <div style={{ padding: '8px 12px', background: 'rgba(8, 13, 27, 0.7)', borderRadius: '6px', borderLeft: '3px solid var(--as-blue-bright)' }}>
                  <span style={{ color: 'var(--as-text-muted)' }}>[14:24:18]</span> <span style={{ color: 'var(--as-blue-ice)' }}>SUPERVISOR_MEMORY</span> :: Saved verified fact: "JWT secret key must be loaded from os.environ['AUTH_JWT_SECRET']".
                </div>
                <div style={{ padding: '8px 12px', background: 'rgba(8, 13, 27, 0.7)', borderRadius: '6px', borderLeft: '3px solid #22c55e' }}>
                  <span style={{ color: 'var(--as-text-muted)' }}>[14:24:25]</span> <span style={{ color: '#22c55e' }}>[VERIFICATION RUNNER]</span> Isolated sandbox build pass. AST diff matches approved scope.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Disclaimer & Launch Button */}
        <div className="as-preview-disclaimer">
          <div>
            <span>Demonstration View</span> • Representative Control Room UI showing authentic state structures.
          </div>
          <button
            onClick={onLaunchControlRoom}
            className="as-btn as-btn-primary as-btn-sm"
          >
            <span>Launch Operational Control Room</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </section>
  );
};
