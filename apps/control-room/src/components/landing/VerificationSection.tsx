import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Lock,
  GitCommit
} from 'lucide-react';

export const VerificationSection: React.FC = () => {
  return (
    <section id="verification" className="as-editorial-section as-verification-section">
      <div className="as-container">
        {/* Editorial Section Header */}
        <div className="as-editorial-header">
          <div className="as-mono-tag">
            <span>[ INDEPENDENT VERIFICATION LAYER // THE AIR-GAPPED JUDGE ]</span>
          </div>
          <h2 className="as-editorial-title">
            Done isn't done until it's verified.
          </h2>
          <p className="as-editorial-sub">
            Never let an AI agent grade its own homework. AI Supervisor enforces an air-gapped verification sandbox where code changes are deterministically proven before any commit is accepted.
          </p>
        </div>

        {/* Verification Architecture Composition */}
        <div className="as-verification-layout">
          {/* Left: Architectural Verification Matrix Diagram */}
          <div className="as-verif-matrix-card">
            <div className="as-matrix-header">
              <span className="as-matrix-pill">AIR-GAPPED SANDBOX PIPELINE</span>
              <span className="as-matrix-title">Deterministic Verification Gates</span>
            </div>

            {/* Visual SVG Connected Flow */}
            <div className="as-matrix-flow">
              {/* Stage 1: Candidate Diff */}
              <div className="as-flow-step">
                <div className="as-step-badge">INPUT</div>
                <div className="as-step-card">
                  <div className="as-step-card-header">
                    <GitCommit size={15} color="var(--as-blue-ice)" />
                    <span>Agent Candidate Diff</span>
                  </div>
                  <p className="as-step-card-desc">Worktree patch emitted by autonomous worker</p>
                </div>
              </div>

              <div className="as-flow-arrow">
                <ArrowRight size={16} />
              </div>

              {/* Stage 2: Air-Gapped Sandbox */}
              <div className="as-flow-step">
                <div className="as-step-badge active">ISOLATION</div>
                <div className="as-step-card active">
                  <div className="as-step-card-header">
                    <Lock size={15} color="var(--as-blue-bright)" />
                    <span>Air-Gapped Sandbox</span>
                  </div>
                  <p className="as-step-card-desc">Ephemeral container with zero agent network/write access</p>
                </div>
              </div>

              <div className="as-flow-arrow">
                <ArrowRight size={16} />
              </div>

              {/* Stage 3: Verification Verdict */}
              <div className="as-flow-step">
                <div className="as-step-badge verified">VERDICT</div>
                <div className="as-step-card verified">
                  <div className="as-step-card-header">
                    <ShieldCheck size={15} color="#22c55e" />
                    <span>Cryptographic Sign-off</span>
                  </div>
                  <p className="as-step-card-desc">Deterministic proof recorded to SQLite WAL journal</p>
                </div>
              </div>
            </div>

            {/* Verification Gates Table */}
            <div className="as-matrix-gates">
              <div className="as-gate-row">
                <div className="as-gate-status pass">
                  <CheckCircle2 size={15} />
                </div>
                <div className="as-gate-info">
                  <div className="as-gate-name">AST Syntactic Boundary Guard</div>
                  <div className="as-gate-desc">Parses candidate files into AST trees to ensure modifications strictly match declared function signatures without side effects.</div>
                </div>
                <span className="as-gate-tag">AST Determinism</span>
              </div>

              <div className="as-gate-row">
                <div className="as-gate-status pass">
                  <CheckCircle2 size={15} />
                </div>
                <div className="as-gate-info">
                  <div className="as-gate-name">Air-Gapped Unit & Integration Test Suite</div>
                  <div className="as-gate-desc">Executes un-tampered test fixtures in a clean sandbox where the agent cannot suppress assertions or alter timeouts.</div>
                </div>
                <span className="as-gate-tag">100% Coverage</span>
              </div>

              <div className="as-gate-row">
                <div className="as-gate-status pass">
                  <CheckCircle2 size={15} />
                </div>
                <div className="as-gate-info">
                  <div className="as-gate-name">Automated Git Rollback Engine</div>
                  <div className="as-gate-desc">If test runs fail or regression signatures are found, worktree is instantly reverted to clean pre-mission commit SHA.</div>
                </div>
                <span className="as-gate-tag">&lt; 150ms Recovery</span>
              </div>
            </div>
          </div>

          {/* Right: Authoritative Governance Rules */}
          <div className="as-verif-editorial-panel">
            <div className="as-panel-rule">
              <span className="as-rule-number">RULE 01</span>
              <h3 className="as-rule-title">Zero Self-Certification</h3>
              <p className="as-rule-desc">
                An LLM claiming "All tests passed and code is ready for production" has zero legal weight in the supervisory layer. Only empirical exit codes from an external process runner are recognized.
              </p>
            </div>

            <div className="as-panel-rule">
              <span className="as-rule-number">RULE 02</span>
              <h3 className="as-rule-title">Read-Only Test Invariants</h3>
              <p className="as-rule-desc">
                When an agent encounters failing unit tests, its instinct is frequently to rewrite the test to make it pass. AI Supervisor locks all test fixtures into read-only mounts throughout execution.
              </p>
            </div>

            <div className="as-panel-rule">
              <span className="as-rule-number">RULE 03</span>
              <h3 className="as-rule-title">Cryptographic Journaling</h3>
              <p className="as-rule-desc">
                Every verified task emits an immutable record containing git diff hashes, test stdout, model parameter logs, and cost metrics into the project’s local SQLite database.
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="as-verif-stat-pill">
              <div className="as-stat-num">0%</div>
              <div className="as-stat-desc">False positive completion claims accepted by AI Supervisor.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
