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
  // 1. DigitalOcean Agent — Satellite Node (Extreme Far Left Top)
  {
    id: 'digitalocean',
    name: 'DigitalOcean Agent',
    provider: 'DigitalOcean',
    role: 'Isolated MicroVM Cloud Sandbox',
    size: 115,
    x: 3,
    y: 6,
    mobileX: 4,
    mobileY: 4,
    floatAnimation: 'as-float-slow-1',
    bloomDelay: 0.85,
    status: 'MicroVM Sandbox',
    connectionType: 'Cloud Hypervisor'
  },
  // 2. Claude Code — Prominent Focal Anchor (Far Left Upper)
  {
    id: 'claude_code',
    name: 'Claude Code',
    provider: 'Anthropic',
    role: 'Autonomous CLI & Code Editing',
    size: 160,
    x: 4,
    y: 28,
    mobileX: 6,
    mobileY: 26,
    floatAnimation: 'as-float-slow-1',
    bloomDelay: 0.15,
    status: 'Native Adapter',
    connectionType: 'CLI Subprocess'
  },
  // 3. Windsurf — Medium Node (Far Left Mid)
  {
    id: 'windsurf',
    name: 'Windsurf',
    provider: 'Codeium',
    role: 'Cascade Flow & AST-Aware Generation',
    size: 130,
    x: 2,
    y: 52,
    mobileX: 4,
    mobileY: 50,
    floatAnimation: 'as-float-slow-3',
    bloomDelay: 0.5,
    status: 'Editor Bridge',
    connectionType: 'Worktree Sync'
  },
  // 4. Devin — Prominent Anchor (Far Left Lower)
  {
    id: 'devin',
    name: 'Devin',
    provider: 'Cognition',
    role: 'End-to-End Autonomous Engineering',
    size: 145,
    x: 5,
    y: 76,
    mobileX: 6,
    mobileY: 74,
    floatAnimation: 'as-float-slow-3',
    bloomDelay: 0.42,
    status: 'Cloud Sandbox',
    connectionType: 'REST API'
  },
  // 5. Cline — Satellite Node (Bottom Left Orbit)
  {
    id: 'cline',
    name: 'Cline',
    provider: 'Autonomous Protocol',
    role: 'Terminal Execution & AST Patching',
    size: 110,
    x: 18,
    y: 89,
    mobileX: 20,
    mobileY: 90,
    floatAnimation: 'as-float-slow-2',
    bloomDelay: 0.7,
    status: 'Native Adapter',
    connectionType: 'Local CLI'
  },
  // 6. Gemini CLI — Medium Node (Extreme Far Right Top)
  {
    id: 'gemini',
    name: 'Gemini CLI',
    provider: 'Google DeepMind',
    role: 'Architecture Planning & 1M-Token Context',
    size: 125,
    x: 90,
    y: 6,
    mobileX: 88,
    mobileY: 4,
    floatAnimation: 'as-float-slow-1',
    bloomDelay: 0.35,
    status: 'Native Adapter',
    connectionType: 'SDK Runner'
  },
  // 7. OpenAI Codex — Medium-Large Node (Far Right Upper)
  {
    id: 'codex',
    name: 'OpenAI Codex',
    provider: 'OpenAI',
    role: 'Precision Code Repair & Algorithmic Handoff',
    size: 145,
    x: 88,
    y: 28,
    mobileX: 86,
    mobileY: 26,
    floatAnimation: 'as-float-slow-2',
    bloomDelay: 0.22,
    status: 'Native Adapter',
    connectionType: 'Responses API'
  },
  // 8. Cursor — Large Focal Anchor (Far Right Mid)
  {
    id: 'cursor',
    name: 'Cursor',
    provider: 'Anysphere',
    role: 'IDE Worktree Execution & Patches',
    size: 160,
    x: 89,
    y: 52,
    mobileX: 87,
    mobileY: 50,
    floatAnimation: 'as-float-slow-2',
    bloomDelay: 0.28,
    status: 'Worktree Bridge',
    connectionType: 'IPC Protocol'
  },
  // 9. GitHub Copilot — Medium Node (Far Right Lower)
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    provider: 'Microsoft / GitHub',
    role: 'Multi-file Edits & Workspace Actions',
    size: 130,
    x: 86,
    y: 75,
    mobileX: 84,
    mobileY: 74,
    floatAnimation: 'as-float-slow-1',
    bloomDelay: 0.6,
    status: 'Language Server',
    connectionType: 'LSP / CLI'
  },
  // 10. Hermes Agent — Satellite Node (Bottom Right Orbit)
  {
    id: 'hermes',
    name: 'Hermes Agent',
    provider: 'Nous Research',
    role: 'Persistent Open-Weight Agent Sessions',
    size: 115,
    x: 72,
    y: 89,
    mobileX: 70,
    mobileY: 90,
    floatAnimation: 'as-float-slow-3',
    bloomDelay: 0.78,
    status: 'Droplet Worker',
    connectionType: 'SSH / Docker'
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
