import React, { useState, useEffect, useRef } from 'react';
import { ProviderLogo } from '../ProviderLogo';

interface ConstellationAgent {
  id: string;
  name: string;
  provider: string;
  role: string;
  size: number;
  x: number; // percentage left on desktop
  y: number; // percentage top on desktop
  mobileX: number; // percentage left on mobile
  mobileY: number; // percentage top on mobile
  floatAnimation: string;
  bloomDelay: number;
  status: string;
  connectionType: string;
}

const SUPPORTED_AGENTS: ConstellationAgent[] = [
  // 1. Claude Code — Prominent Focal Anchor (Top-Left)
  {
    id: 'claude_code',
    name: 'Claude Code',
    provider: 'Anthropic',
    role: 'Autonomous CLI & Code Editing',
    size: 190,
    x: 8,
    y: 12,
    mobileX: 10,
    mobileY: 6,
    floatAnimation: 'as-float-slow-1',
    bloomDelay: 0.15,
    status: 'Native Adapter',
    connectionType: 'CLI Subprocess'
  },
  // 2. Cursor — Large Focal Anchor (Mid-Right)
  {
    id: 'cursor',
    name: 'Cursor',
    provider: 'Anysphere',
    role: 'IDE Worktree Execution & Codebase Patches',
    size: 180,
    x: 84,
    y: 46,
    mobileX: 82,
    mobileY: 52,
    floatAnimation: 'as-float-slow-2',
    bloomDelay: 0.28,
    status: 'Worktree Bridge',
    connectionType: 'IPC Protocol'
  },
  // 3. Devin — Prominent Anchor (Bottom-Left)
  {
    id: 'devin',
    name: 'Devin',
    provider: 'Cognition',
    role: 'End-to-End Autonomous Engineering',
    size: 165,
    x: 9,
    y: 68,
    mobileX: 12,
    mobileY: 78,
    floatAnimation: 'as-float-slow-3',
    bloomDelay: 0.42,
    status: 'Cloud Sandbox',
    connectionType: 'REST API'
  },
  // 4. OpenAI Codex — Medium-Large Node (Top-Right)
  {
    id: 'codex',
    name: 'OpenAI Codex',
    provider: 'OpenAI',
    role: 'Precision Code Repair & Algorithmic Handoff',
    size: 155,
    x: 81,
    y: 12,
    mobileX: 78,
    mobileY: 8,
    floatAnimation: 'as-float-slow-2',
    bloomDelay: 0.22,
    status: 'Native Adapter',
    connectionType: 'Responses API'
  },
  // 5. Google Gemini CLI — Medium Node (Upper-Center-Right)
  {
    id: 'gemini',
    name: 'Gemini CLI',
    provider: 'Google DeepMind',
    role: 'Architecture Planning & 1M-Token Context',
    size: 140,
    x: 65,
    y: 4,
    mobileX: 68,
    mobileY: 2,
    floatAnimation: 'as-float-slow-1',
    bloomDelay: 0.35,
    status: 'Native Adapter',
    connectionType: 'SDK Runner'
  },
  // 6. Windsurf — Medium Node (Mid-Left)
  {
    id: 'windsurf',
    name: 'Windsurf',
    provider: 'Codeium',
    role: 'Cascade Flow & AST-Aware Generation',
    size: 135,
    x: 3,
    y: 40,
    mobileX: 4,
    mobileY: 42,
    floatAnimation: 'as-float-slow-3',
    bloomDelay: 0.5,
    status: 'Editor Bridge',
    connectionType: 'Worktree Sync'
  },
  // 7. GitHub Copilot — Medium Node (Lower-Right)
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    provider: 'Microsoft / GitHub',
    role: 'Multi-file Edits & Workspace Actions',
    size: 145,
    x: 77,
    y: 75,
    mobileX: 76,
    mobileY: 82,
    floatAnimation: 'as-float-slow-1',
    bloomDelay: 0.6,
    status: 'Language Server',
    connectionType: 'LSP / CLI'
  },
  // 8. Cline — Satellite Node (Lower-Center-Left)
  {
    id: 'cline',
    name: 'Cline',
    provider: 'Autonomous Protocol',
    role: 'Terminal Execution & AST Patching',
    size: 120,
    x: 27,
    y: 84,
    mobileX: 30,
    mobileY: 90,
    floatAnimation: 'as-float-slow-2',
    bloomDelay: 0.7,
    status: 'Native Adapter',
    connectionType: 'Local CLI'
  },
  // 9. Hermes Agent — Satellite Node (Lower-Center-Right)
  {
    id: 'hermes',
    name: 'Hermes Agent',
    provider: 'Nous Research',
    role: 'Persistent Open-Weight Agent Sessions',
    size: 125,
    x: 52,
    y: 85,
    mobileX: 52,
    mobileY: 92,
    floatAnimation: 'as-float-slow-3',
    bloomDelay: 0.78,
    status: 'Droplet Worker',
    connectionType: 'SSH / Docker'
  },
  // 10. DigitalOcean Agent — Satellite Node (Upper-Center-Left)
  {
    id: 'digitalocean',
    name: 'DigitalOcean Agent',
    provider: 'DigitalOcean',
    role: 'Isolated MicroVM Cloud Sandbox',
    size: 110,
    x: 29,
    y: 4,
    mobileX: 30,
    mobileY: 2,
    floatAnimation: 'as-float-slow-1',
    bloomDelay: 0.85,
    status: 'MicroVM Sandbox',
    connectionType: 'Cloud Hypervisor'
  }
];

// Atmospheric luminous gradient spheres inspired directly by reference video frames
interface RadiantOrb {
  x: number;
  y: number;
  size: number;
  glowClass: string;
  driftClass: string;
}

const RADIANT_ORBS: RadiantOrb[] = [
  { x: 19, y: 32, size: 105, glowClass: 'as-orb-electric', driftClass: 'as-float-slow-2' },
  { x: 74, y: 34, size: 120, glowClass: 'as-orb-ice', driftClass: 'as-float-slow-1' },
  { x: 38, y: 76, size: 85,  glowClass: 'as-orb-royal', driftClass: 'as-float-slow-3' },
  { x: 62, y: 78, size: 95,  glowClass: 'as-orb-cyan', driftClass: 'as-float-slow-2' }
];

export const HeroConstellation: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="as-constellation-stage" ref={stageRef} aria-label="Supported AI Agents Constellation">
      {/* 1. Luminous Ambient Gradient Spheres (From Video Reference) */}
      {RADIANT_ORBS.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className={`as-radiant-orb ${orb.glowClass} ${orb.driftClass}`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`
          }}
          aria-hidden="true"
        />
      ))}

      {/* 2. Coordinated Agent Nodes with Large Visual Scale & Authentic Logos */}
      {SUPPORTED_AGENTS.map((agent) => {
        const posX = isMobile ? agent.mobileX : agent.x;
        const posY = isMobile ? agent.mobileY : agent.y;
        const finalSize = isMobile ? Math.max(Math.round(agent.size * 0.58), 54) : agent.size;
        const logoSize = Math.round(finalSize * 0.44);

        return (
          <div
            key={agent.id}
            className={`as-node-anchor ${agent.floatAnimation}`}
            style={{
              left: `${posX}%`,
              top: `${posY}%`,
              width: `${finalSize}px`,
              height: `${finalSize}px`
            }}
          >
            {/* Inner blooming element (staggered opening sequence) */}
            <div
              className="as-node-card as-bloom-entrance"
              style={{
                animationDelay: `${agent.bloomDelay}s`
              }}
              onMouseEnter={() => setActiveTooltip(agent.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              onFocus={() => setActiveTooltip(agent.id)}
              onBlur={() => setActiveTooltip(null)}
              tabIndex={0}
              role="button"
              aria-label={`${agent.name} — ${agent.provider} supported agent`}
            >
              {/* Outer soft glow ring */}
              <div className="as-node-ring" />

              {/* Glass surface with subtle radial gradient reflection */}
              <div className="as-node-content">
                <ProviderLogo providerId={agent.id} size={logoSize} />
                <span className="as-node-label">{agent.name}</span>
              </div>

              {/* High-visibility Identity Tooltip Card */}
              <div
                className={`as-node-card-tooltip ${activeTooltip === agent.id ? 'visible' : ''}`}
                role="tooltip"
              >
                <div className="as-tooltip-header">
                  <span className="as-tooltip-name">{agent.name}</span>
                  <span className="as-tooltip-badge">{agent.status}</span>
                </div>
                <div className="as-tooltip-provider">{agent.provider} • {agent.connectionType}</div>
                <div className="as-tooltip-role">{agent.role}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
