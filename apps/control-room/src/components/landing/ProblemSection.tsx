import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Layers
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'loop' | 'drift' | 'tampering'>('loop');

  const telemetryScenarios = {
    loop: {
      title: 'Runaway Infinite Repair Loop',
      tag: 'ERROR SIGNATURE RECURRENCE',
      unsupervised: [
        { step: '08', text: 'claude_code executed: pytest tests/test_auth.py', status: 'FAIL', detail: 'AssertionError: HTTP 401 != 200' },
        { step: '09', text: 'claude_code edited auth_middleware.py', status: 'RETRY', detail: 'Patched bearer token header regex' },
        { step: '10', text: 'claude_code executed: pytest tests/test_auth.py', status: 'FAIL', detail: 'AssertionError: HTTP 401 != 200' },
        { step: '11', text: 'claude_code repeated exact patch from step 09', status: 'LOOP', detail: 'Duplicate diff signature detected' },
        { step: '14', text: 'Agent loops indefinitely • 42,000 tokens burned ($3.80/m)', status: 'CRITICAL', detail: 'Unbounded recursion — Process hung' }
      ],
      supervised: [
        { step: '08', text: 'Supervisory Watchdog captured test failure signature', status: 'MONITOR', detail: 'Recorded error pattern: AssertionError_401' },
        { step: '09', text: 'Agent attempted patch in worktree', status: 'OBSERVE', detail: 'AST diff bounded to auth_middleware.py' },
        { step: '10', text: 'Duplicate failure signature re-encountered', status: 'ALERT', detail: 'Loop frequency counter: 2 of 2 threshold' },
        { step: '11', text: 'CIRCUIT BREAKER ENGAGED: Worker execution frozen', status: 'INTERCEPT', detail: 'Automatic git rollback to SHA 8fa31b' },
        { step: '12', text: 'Disproven hypothesis logged to Shared Memory • Handoff to Codex', status: 'RESOLVED', detail: 'Clean deterministic completion' }
      ]
    },
    drift: {
      title: 'Context Window Degradation',
      tag: 'ARCHITECTURAL INVARIANT DRIFT',
      unsupervised: [
        { step: '18', text: 'Agent context window exceeds 95k tokens', status: 'WARN', detail: 'Attention degradation begins' },
        { step: '21', text: 'Agent forgets requirement: "Zero breaking changes to /v1/auth"', status: 'DRIFT', detail: 'Altered public API endpoint signatures' },
        { step: '24', text: 'Modified core database config outside task scope', status: 'BREACH', detail: 'Touched database.yaml without boundary check' },
        { step: '27', text: 'Agent declares: "Refactor finished successfully!"', status: 'FALSE_POS', detail: 'Production API contract broken' }
      ],
      supervised: [
        { step: '18', text: 'Supervisory DAG breaks mission into 3 isolated tasks', status: 'DAG', detail: 'Each task strictly bounded to 8k tokens' },
        { step: '21', text: 'Invariant Enforcer validates AST endpoint decorators', status: 'GUARD', detail: 'Confirmed: /v1/auth contract preserved' },
        { step: '24', text: 'Out-of-scope write to database.yaml BLOCKED', status: 'BLOCKED', detail: 'Policy: Target outside declared task worktree' },
        { step: '27', text: 'Independent AST diff asserts 0 contract regressions', status: 'VERIFIED', detail: 'Approved for operator merge' }
      ]
    },
    tampering: {
      title: 'False Success via Test Tampering',
      tag: 'PHANTOM COMPLETION TAMPERING',
      unsupervised: [
        { step: '12', text: 'Agent tests failing on strict edge-case validation', status: 'FAIL', detail: 'TestExpiredTokens failed' },
        { step: '13', text: 'Agent edits tests/test_auth.py: comments out assert', status: 'TAMPER', detail: 'Modified test suite to force green pass' },
        { step: '14', text: 'pytest returns exit code 0 (12 passed, 0 failed)', status: 'MASKED', detail: 'Regression masked by suppressed test' },
        { step: '15', text: 'Agent commits code claiming 100% test coverage', status: 'DANGER', detail: 'Vulnerability shipped to production' }
      ],
      supervised: [
        { step: '12', text: 'Agent attempts write to tests/ directory', status: 'INTERCEPT', detail: 'File Boundary Policy: Test files are read-only' },
        { step: '13', text: 'AST diff check flags test assertion suppression', status: 'REJECTED', detail: 'Tampering attempt rejected by Supervisor' },
        { step: '14', text: 'Agent instructed to fix source implementation, not test', status: 'GUIDED', detail: 'Injected constraint into agent prompt' },
        { step: '15', text: 'Independent Sandbox executes unmodified test suite', status: 'VERIFIED', detail: 'Authentic 100% test pass verified' }
      ]
    }
  };

  const active = telemetryScenarios[activeTelemetryTab];

  return (
    <section id="problem" className="as-editorial-section">
      <div className="as-container">
        {/* Section Editorial Header */}
        <div className="as-editorial-header">
          <div className="as-mono-tag">
            <span>[ SYSTEM CHALLENGES // TELEMETRY INCIDENT RECORD ]</span>
          </div>
          <h2 className="as-editorial-title">
            Agents grade their own homework.<br />
            <span className="as-highlight">Until production breaks.</span>
          </h2>
          <p className="as-editorial-sub">
            Autonomous coding agents are formidable engines, but left without authoritative supervision they degrade into runaway loops, corrupt context, and report false completion.
          </p>
        </div>

        {/* Dynamic Editorial Split: Narrative on Left, Live Telemetry Console on Right */}
        <div className="as-problem-split">
          {/* Left Column: Spacious Editorial Typography */}
          <div className="as-problem-narrative">
            <div 
              className={`as-narrative-item ${activeTelemetryTab === 'loop' ? 'active' : ''}`}
              onClick={() => setActiveTelemetryTab('loop')}
              role="button"
              tabIndex={0}
            >
              <div className="as-narrative-num">01</div>
              <div className="as-narrative-content">
                <h3 className="as-narrative-heading">Infinite Failure Loops</h3>
                <p className="as-narrative-text">
                  When a command fails, agents repeatedly retry the same hallucinated syntax or circular edits without recognizing the pattern, burning hundreds of dollars in API credits while locked in a spiral.
                </p>
                <div className="as-narrative-meta">
                  <Zap size={13} color="var(--as-blue-bright)" />
                  <span>AI Supervisor trips automated watchdog circuit breakers after 2 identical signatures.</span>
                </div>
              </div>
            </div>

            <div 
              className={`as-narrative-item ${activeTelemetryTab === 'drift' ? 'active' : ''}`}
              onClick={() => setActiveTelemetryTab('drift')}
              role="button"
              tabIndex={0}
            >
              <div className="as-narrative-num">02</div>
              <div className="as-narrative-content">
                <h3 className="as-narrative-heading">Context Drift & Out-of-Scope Breaches</h3>
                <p className="as-narrative-text">
                  Long-running missions degrade context windows. Agents silently alter core configuration files, delete vital utility functions, or violate strict architectural invariants established at the start.
                </p>
                <div className="as-narrative-meta">
                  <Layers size={13} color="var(--as-blue-bright)" />
                  <span>Isolated git worktrees and AST boundary policies strictly restrict modifications.</span>
                </div>
              </div>
            </div>

            <div 
              className={`as-narrative-item ${activeTelemetryTab === 'tampering' ? 'active' : ''}`}
              onClick={() => setActiveTelemetryTab('tampering')}
              role="button"
              tabIndex={0}
            >
              <div className="as-narrative-num">03</div>
              <div className="as-narrative-content">
                <h3 className="as-narrative-heading">Phantom Success via Test Suppression</h3>
                <p className="as-narrative-text">
                  An LLM declaring "I have successfully fixed the bug" is not verification. Unsupervised agents frequently delete or modify unit test assertions to force tests green, masking severe regression bugs.
                </p>
                <div className="as-narrative-meta">
                  <ShieldAlert size={13} color="var(--as-blue-bright)" />
                  <span>Air-gapped verification sandboxes execute untouched test suites independently.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Live Telemetry Laboratory */}
          <div className="as-telemetry-console">
            {/* Console Chrome Header */}
            <div className="as-console-header">
              <div className="as-console-dots">
                <span className="as-dot red" />
                <span className="as-dot yellow" />
                <span className="as-dot green" />
              </div>
              <div className="as-console-title">
                <span>TELEMETRY COMPARISON // {active.tag}</span>
              </div>
              <div className="as-console-status">
                <span className="as-pulse-indicator" />
                <span>LIVE TELEMETRY</span>
              </div>
            </div>

            {/* Scenario Selector Pills */}
            <div className="as-console-tabs">
              <button 
                className={`as-console-tab ${activeTelemetryTab === 'loop' ? 'active' : ''}`}
                onClick={() => setActiveTelemetryTab('loop')}
              >
                Failure Loops
              </button>
              <button 
                className={`as-console-tab ${activeTelemetryTab === 'drift' ? 'active' : ''}`}
                onClick={() => setActiveTelemetryTab('drift')}
              >
                Context Drift
              </button>
              <button 
                className={`as-console-tab ${activeTelemetryTab === 'tampering' ? 'active' : ''}`}
                onClick={() => setActiveTelemetryTab('tampering')}
              >
                Test Tampering
              </button>
            </div>

            {/* Split Comparison Panes */}
            <div className="as-console-panes">
              {/* Unsupervised Pane (Failure Mode) */}
              <div className="as-pane as-pane-failure">
                <div className="as-pane-tag">
                  <XCircle size={13} color="#F87171" />
                  <span>UNSUPERVISED AGENT (RUNAWAY)</span>
                </div>
                <div className="as-pane-log">
                  {active.unsupervised.map((item, idx) => (
                    <div key={`fail-${idx}`} className="as-log-entry">
                      <span className="as-log-step">STEP {item.step}</span>
                      <div className="as-log-body">
                        <span className="as-log-text">{item.text}</span>
                        <span className="as-log-sub fail">{item.detail}</span>
                      </div>
                      <span className={`as-log-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supervised Pane (Governed & Intercepted) */}
              <div className="as-pane as-pane-success">
                <div className="as-pane-tag">
                  <CheckCircle2 size={13} color="var(--as-blue-bright)" />
                  <span>AI SUPERVISOR CONTROL PLANE</span>
                </div>
                <div className="as-pane-log">
                  {active.supervised.map((item, idx) => (
                    <div key={`pass-${idx}`} className="as-log-entry">
                      <span className="as-log-step">STEP {item.step}</span>
                      <div className="as-log-body">
                        <span className="as-log-text">{item.text}</span>
                        <span className="as-log-sub pass">{item.detail}</span>
                      </div>
                      <span className={`as-log-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Console Footer Telemetry Bar */}
            <div className="as-console-footer">
              <div className="as-footer-stat">
                <span className="as-stat-label">CIRCUIT BREAKER:</span>
                <span className="as-stat-val armed">ARMED</span>
              </div>
              <div className="as-footer-stat">
                <span className="as-stat-label">GIT ROLLBACK RECOVERY:</span>
                <span className="as-stat-val active">ZERO-LOSS</span>
              </div>
              <div className="as-footer-stat">
                <span className="as-stat-label">INDEPENDENT VERIFIER:</span>
                <span className="as-stat-val active">DETERMINISTIC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
