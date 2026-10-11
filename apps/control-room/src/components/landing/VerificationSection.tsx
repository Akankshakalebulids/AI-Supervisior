import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  AlertOctagon, 
  ArrowRight
} from 'lucide-react';

export const VerificationSection: React.FC = () => {
  return (
    <section id="verification" className="as-section">
      <div className="as-section-header">
        <span className="as-section-tag">Core Product Principle</span>
        <h2 className="as-section-title">
          Done isn't done until it's verified.
        </h2>
        <p className="as-section-desc">
          An agent claiming completion is not the same as verified completion. AI Supervisor assesses concrete empirical evidence—running isolated sandboxes, checking AST diffs, and asserting test suites—instead of trusting generative output.
        </p>
      </div>

      {/* Visual Sequence Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        padding: '16px 24px',
        background: 'rgba(17, 29, 53, 0.7)',
        border: '1px solid var(--as-border-subtle)',
        borderRadius: '9999px',
        maxWidth: '780px',
        margin: '0 auto 40px',
        fontSize: '13px',
        fontWeight: 600
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--as-text-muted)' }}>
          <span style={{ fontFamily: 'var(--font-mono)' }}>01</span>
          <span>Agent Reports Completion</span>
        </div>
        <ArrowRight size={14} color="var(--as-blue-bright)" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--as-blue-ice)' }}>
          <span style={{ fontFamily: 'var(--font-mono)' }}>02</span>
          <span>Supervisor Checks Evidence</span>
        </div>
        <ArrowRight size={14} color="var(--as-blue-bright)" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e' }}>
          <span style={{ fontFamily: 'var(--font-mono)' }}>03</span>
          <span>Verified & Merged (or Flagged)</span>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="as-verification-wrapper">
        {/* Untrusted / Agent Claims */}
        <div className="as-verification-card untrusted">
          <div className="as-verif-badge fail">
            <AlertOctagon size={13} />
            <span>UNTRUSTED: AGENT CLAIM</span>
          </div>

          <h3 className="as-verif-title">Self-Reported "Success"</h3>

          <div className="as-verif-list">
            <div className="as-verif-item">
              <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Agent message: "I've implemented all requested endpoints and tests are passing."</span>
            </div>
            <div className="as-verif-item">
              <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Modified files outside expected scope: altered database config and dropped migration checks.</span>
            </div>
            <div className="as-verif-item">
              <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Commented out broken unit tests instead of repairing the underlying logic.</span>
            </div>
            <div className="as-verif-item">
              <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Leaves uncommitted dirty worktree artifacts and broken imports.</span>
            </div>
          </div>
        </div>

        {/* Trusted / Supervisor Verification */}
        <div className="as-verification-card trusted">
          <div className="as-verif-badge pass">
            <ShieldCheck size={13} />
            <span>AUTHORITATIVE: SUPERVISOR VERIFICATION</span>
          </div>

          <h3 className="as-verif-title">Empirical Evidence Gate</h3>

          <div className="as-verif-list">
            <div className="as-verif-item">
              <CheckCircle2 size={16} color="var(--as-blue-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Independent Sandbox Runner: Tests executed in clean ephemeral worktree with zero agent intervention.</span>
            </div>
            <div className="as-verif-item">
              <CheckCircle2 size={16} color="var(--as-blue-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Strict AST Diff Validation: Verifies that only pre-approved target files were modified.</span>
            </div>
            <div className="as-verif-item">
              <CheckCircle2 size={16} color="var(--as-blue-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Deterministic Exit Codes: Re-runs linting and typecheck to ensure zero regressions.</span>
            </div>
            <div className="as-verif-item">
              <CheckCircle2 size={16} color="var(--as-blue-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Git Commit Provenance: Clean commit created with verified test summary and full audit trail.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
