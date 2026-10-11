import React from 'react';
import { 
  AlertTriangle, 
  RotateCcw, 
  GitFork, 
  ShieldAlert, 
  FileCheck2, 
  Layers 
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: RotateCcw,
      title: 'Infinite Failure Loops',
      desc: 'Coding agents repeatedly execute failing commands, hallucinatory test runs, or recursive edits without recognizing that they are stuck in a cycle.',
      telemetry: 'Watchdog Intercepts: Error frequency threshold > 3 triggers automatic circuit breaker'
    },
    {
      icon: GitFork,
      title: 'Lost Context Across Handoffs',
      desc: 'When an agent gets stuck or exhausts tokens, switching to another model loses implicit constraints, repeating the exact same errors from scratch.',
      telemetry: 'Cross-Agent Memory: SQLite fact store synchronizes rejected approaches and invariants'
    },
    {
      icon: ShieldAlert,
      title: 'Out-of-Scope Code Corruption',
      desc: 'Autonomous agents frequently modify unrelated files, wipe test assertions to make tests pass, or delete configuration scripts outside their goal boundary.',
      telemetry: 'AST Diff Guard: Scoped file boundaries enforce strict worktree isolation'
    },
    {
      icon: FileCheck2,
      title: 'Unverified Completion Claims',
      desc: 'An LLM declaring "I have completed all tasks successfully!" is not proof of completion. Syntax errors, broken builds, and regression failures are often masked.',
      telemetry: 'Independent Verifier: Isolated deterministic tests validate results before merge'
    },
    {
      icon: Layers,
      title: 'Fleet Coordination Overhead',
      desc: 'Orchestrating Claude Code, Codex, local Qwen, and Gemini across disparate CLIs creates fragmentation, zero centralized telemetry, and untracked cost.',
      telemetry: 'Universal Adapter Layer: Unified state, live WebSocket events, and single control plane'
    },
    {
      icon: AlertTriangle,
      title: 'Long-Running Task Drift',
      desc: 'As task execution stretches across hundreds of tool calls, original user intent and constraints degrade, leading to scope creep and runaway cloud spend.',
      telemetry: 'Supervisory DAG: Real-time invariant enforcement and bounded task iterations'
    }
  ];

  return (
    <section id="problem" className="as-section">
      <div className="as-section-header">
        <span className="as-section-tag">System Challenges</span>
        <h2 className="as-section-title">
          Your agents can do the work.<br />
          Who makes sure they finish it?
        </h2>
        <p className="as-section-desc">
          Autonomous agents are powerful workers, but left unsupervised they degrade into failure loops, corrupt context, and report false completion. AI Supervisor provides the authoritative governance layer.
        </p>
      </div>

      <div className="as-problem-grid">
        {problems.map((prob, i) => {
          const Icon = prob.icon;
          return (
            <div key={i} className="as-problem-card">
              <div className="as-problem-icon-wrapper">
                <Icon size={20} />
              </div>
              <h3 className="as-problem-card-title">{prob.title}</h3>
              <p className="as-problem-card-desc">{prob.desc}</p>
              <div className="as-problem-telemetry-badge">
                <span>{prob.telemetry}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
