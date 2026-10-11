import React, { useState } from 'react';
import { 
  Target, 
  Layers, 
  GitPullRequest, 
  Terminal, 
  Activity, 
  ShieldAlert, 
  RotateCcw, 
  ShieldCheck 
} from 'lucide-react';

interface Stage {
  step: string;
  id: string;
  title: string;
  icon: React.ElementType;
  summary: string;
  description: string;
  codeSnippet: string;
}

const WORKFLOW_STAGES: Stage[] = [
  {
    step: '01',
    id: 'mission',
    title: 'MISSION',
    icon: Target,
    summary: 'Human intent stated in natural language',
    description: 'The operator declares high-level engineering requirements without needing to pre-configure individual task IDs or worktree paths.',
    codeSnippet: `// 1. Mission Declaration
POST /api/missions/draft
{
  "goal": "Refactor authentication layer to JWT with refresh tokens",
  "repository_path": "/workspace/service",
  "invariants": ["Zero breaking changes to /v1/auth endpoint"]
}`
  },
  {
    step: '02',
    id: 'plan',
    title: 'PLAN',
    icon: Layers,
    summary: 'DAG decomposition with strict boundaries',
    description: 'AI Supervisor decomposes the intent into a directed acyclic graph (DAG) of isolated tasks, each bounded by strict expected file scopes.',
    codeSnippet: `// 2. DAG Decomposition
DAG Plan Generated:
├─ Task 1: Generate JWT token utility module (tokens.py)
├─ Task 2: Implement refresh token database migration (003_tokens.sql)
└─ Task 3: Hook token verification middleware (auth_middleware.py)
Dependency Graph: Task 1 + Task 2 -> Task 3`
  },
  {
    step: '03',
    id: 'route',
    title: 'ROUTE',
    icon: GitPullRequest,
    summary: 'Dispatch to optimal verified agent',
    description: 'Matches each DAG task to the most capable runtime: Claude Code for large codebase edits, Codex for targeted repairs, or local models for offline execution.',
    codeSnippet: `// 3. Adapter Routing Boundary
Selected: ClaudeCodeAdapter (Anthropic Sonnet 3.7)
Fallback: CodexAdapter (OpenAI GPT-4o)
Execution Mode: LOCAL_SUBPROCESS (Git Worktree isolation)`
  },
  {
    step: '04',
    id: 'execute',
    title: 'EXECUTE',
    icon: Terminal,
    summary: 'Sandboxed tool execution with telemetry',
    description: 'The designated worker executes commands, file modifications, and git operations within an isolated environment while all events are captured.',
    codeSnippet: `// 4. Governed Execution Stream
[14:20:01] claude_code :: ToolCall: EditFile(auth_middleware.py)
[14:20:03] claude_code :: ToolCall: Bash("pytest tests/test_auth.py")
[14:20:05] Status: RUNNING | Worktree: .supervisor/worktrees/task-1`
  },
  {
    step: '05',
    id: 'observe',
    title: 'OBSERVE',
    icon: Activity,
    summary: 'Real-time watchdogs monitor AST diffs',
    description: 'Supervisory watchdogs analyze stdout, stack traces, and filesystem diffs after every single tool call, tracking loop frequency and file boundaries.',
    codeSnippet: `// 5. Watchdog Observation
Watchdog State: ACTIVE
Monitored: AST diff within scope [auth_middleware.py]
Error Frequency Counter: 2 failures on pytest assertion line 44`
  },
  {
    step: '06',
    id: 'intervene',
    title: 'INTERVENE',
    icon: ShieldAlert,
    summary: 'Automatic circuit breaker pauses runaway workers',
    description: 'If an agent repeats the same error twice or attempts to touch files outside its approved boundary, the Supervisor freezes execution immediately.',
    codeSnippet: `// 6. Supervisor Circuit Breaker
[WATCHDOG INTERVENTION] Anomaly: REPEATED_FAILURE_LOOP
Action: PAUSE_WORKER
Reason: "Agent repeated identical failed regex edit 3 times"
Diff state frozen at commit 4f9e12`
  },
  {
    step: '07',
    id: 'handoff',
    title: 'HANDOFF',
    icon: RotateCcw,
    summary: 'Context transfer with shared SQLite memory',
    description: 'The frozen diff, stack trace, and discovered repo constraints are transferred into project memory so a fallback specialist takes over seamlessly.',
    codeSnippet: `// 7. Context-Preserving Handoff
Memory Assertion:
{
  "category": "REJECTED_APPROACH",
  "fact": "Regex substitution fails on multiline decorators in Python 3.12",
  "provenance": "empirically_verified"
}
Dispatched Fallback: CodexAdapter with failure briefing`
  },
  {
    step: '08',
    id: 'verify',
    title: 'VERIFY',
    icon: ShieldCheck,
    summary: 'Independent deterministic verification sandbox',
    description: 'Never trust an agent grading its own homework. An independent test harness validates the build, runs regression tests, and checks AST invariants before acceptance.',
    codeSnippet: `// 8. Independent Verification Gate
Verification Suite: ISOLATED_SANDBOX_RUNNER
[PASS] Unit Tests: 42 passed in 1.4s
[PASS] AST Scope: Only auth_middleware.py and tokens.py modified
[PASS] Clean Build: Exit code 0
Outcome: TASK_VERIFIED & MERGED`
  }
];

export const SupervisionWorkflow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStage = WORKFLOW_STAGES[activeStepIndex];
  const ActiveIcon = activeStage.icon;

  return (
    <section id="how-it-works" className="as-section">
      <div className="as-section-header">
        <span className="as-section-tag">Supervisory Architecture</span>
        <h2 className="as-section-title">
          How Supervision Works
        </h2>
        <p className="as-section-desc">
          From natural language intent to verified production commits: the 8-stage governance pipeline coordinates heterogeneous coding agents with continuous oversight.
        </p>
      </div>

      <div className="as-workflow-container">
        {/* Pipeline Track of 8 Steps */}
        <div className="as-pipeline-track" role="tablist" aria-label="Workflow Steps">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = idx === activeStepIndex;
            return (
              <div
                key={stage.id}
                role="tab"
                aria-selected={isActive}
                tabIndex={0}
                className={`as-pipeline-step ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveStepIndex(idx);
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="as-step-num">{stage.step}</span>
                  <Icon size={14} className="as-step-icon" />
                </div>
                <div className="as-step-title">{stage.title}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="as-workflow-detail-card">
          <div className="as-detail-content">
            <div className="as-detail-step-badge">
              <ActiveIcon size={14} />
              <span>STAGE {activeStage.step} • {activeStage.title}</span>
            </div>
            <h3 className="as-detail-title">{activeStage.summary}</h3>
            <p className="as-detail-desc">{activeStage.description}</p>
          </div>

          <div className="as-detail-ui-mock">
            <pre style={{ margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              <code>{activeStage.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
