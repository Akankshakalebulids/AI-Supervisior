import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProviderLogo } from '../ProviderLogo';

interface ConstellationAgent {
  id: string;
  name: string;
  provider: string;
  role: string;
  size: number;
  x: number; // percentage left on desktop
  y: number; // percentage top on desktop
  z: number; // 3D depth in px
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
    role: 'Isolated MicroVM Cloud Sandbox & Action Gateway',
    size: 110,
    x: 4,
    y: 7,
    z: -30,
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
    role: 'Autonomous CLI & Code Editing in Isolated Worktrees',
    size: 160,
    x: 4,
    y: 28,
    z: 55,
    mobileX: 4,
    mobileY: 10,
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
    role: 'Cascade Flow & AST-Aware Code Generation',
    size: 130,
    x: 2,
    y: 52,
    z: 15,
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
    role: 'End-to-End Autonomous Engineering in Cloud Sandboxes',
    size: 145,
    x: 5,
    y: 76,
    z: 35,
    mobileX: 4,
    mobileY: 82,
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
    role: 'Terminal Execution & AST File Patching',
    size: 110,
    x: 18,
    y: 89,
    z: -20,
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
    role: 'Architecture Planning & 1M-Token Context Analysis',
    size: 125,
    x: 90,
    y: 6,
    z: -25,
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
    z: 40,
    mobileX: 78,
    mobileY: 10,
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
    role: 'IDE Worktree Execution & Codebase Patches',
    size: 160,
    x: 89,
    y: 52,
    z: 50,
    mobileX: 78,
    mobileY: 82,
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
    z: 10,
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
    role: 'Persistent Open-Weight Agent Sessions on Droplets',
    size: 115,
    x: 72,
    y: 89,
    z: -15,
    mobileX: 70,
    mobileY: 90,
    floatAnimation: 'as-float-slow-3',
    bloomDelay: 0.78,
    status: 'Droplet Worker',
    connectionType: 'SSH / Docker'
  }
];

// Atmospheric luminous gradient spheres inspired by reference video
interface RadiantOrb {
  x: number;
  y: number;
  size: number;
  glowClass: string;
  driftClass: string;
}

const RADIANT_ORBS: RadiantOrb[] = [
  { x: 12, y: 35, size: 140, glowClass: 'as-orb-electric', driftClass: 'as-float-slow-2' },
  { x: 82, y: 30, size: 150, glowClass: 'as-orb-ice', driftClass: 'as-float-slow-1' },
  { x: 25, y: 75, size: 110, glowClass: 'as-orb-royal', driftClass: 'as-float-slow-3' },
  { x: 75, y: 80, size: 120, glowClass: 'as-orb-cyan', driftClass: 'as-float-slow-2' }
];

export const HeroConstellation: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTilt = useRef({ x: 0, y: 0 });

  // Check viewport and reduced motion preference
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Smooth mouse tilt damping interpolation
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const animateTilt = () => {
      setTilt(prev => {
        const dx = targetTilt.current.x - prev.x;
        const dy = targetTilt.current.y - prev.y;
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
          return prev;
        }
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08
        };
      });
      rafRef.current = requestAnimationFrame(animateTilt);
    };

    rafRef.current = requestAnimationFrame(animateTilt);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, isMobile]);

  // Mousemove listener across hero
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion || isMobile) return;
    const { innerWidth, innerHeight } = window;
    const nx = (e.clientX / innerWidth - 0.5) * 2; // -1 to +1
    const ny = (e.clientY / innerHeight - 0.5) * 2; // -1 to +1
    targetTilt.current = { x: nx, y: ny };
  }, [prefersReducedMotion, isMobile]);

  const handleMouseLeave = useCallback(() => {
    targetTilt.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // 3D perspective rotation values
  const rotX = prefersReducedMotion || isMobile ? 0 : tilt.y * -6;
  const rotY = prefersReducedMotion || isMobile ? 0 : tilt.x * 7;

  return (
    <div 
      className="as-constellation-stage" 
      ref={stageRef} 
      aria-label="Supported AI Agents 3D Constellation"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Transform Plane */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      >
        {/* 1. Luminous Ambient Gradient Spheres */}
        {RADIANT_ORBS.map((orb, i) => (
          <div
            key={`orb-${i}`}
            className={`as-radiant-orb ${orb.glowClass} ${orb.driftClass}`}
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              transform: `translateZ(-60px)`
            }}
            aria-hidden="true"
          />
        ))}

        {/* 2. Central AI Supervisor Focal Ring & Supervision Layer */}
        <div 
          style={{
            position: 'absolute',
            left: '50%',
            top: '46%',
            width: isMobile ? '280px' : '580px',
            height: isMobile ? '280px' : '580px',
            transform: 'translate(-50%, -50%) translateZ(-40px)',
            borderRadius: '50%',
            border: '1px dashed rgba(76, 141, 255, 0.2)',
            boxShadow: '0 0 60px rgba(52, 120, 246, 0.08), inset 0 0 40px rgba(52, 120, 246, 0.04)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-hidden="true"
        >
          {/* Inner concentric telemetry guide ring */}
          <div style={{
            width: '74%',
            height: '74%',
            borderRadius: '50%',
            border: '1px solid rgba(128, 181, 255, 0.12)',
            boxShadow: '0 0 30px rgba(76, 141, 255, 0.05)'
          }} />

          {/* Central subtle supervisor pulse marker */}
          <div style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--as-blue-bright)',
            boxShadow: '0 0 16px var(--as-blue-bright)'
          }} />
        </div>

        {/* 3. Subtle Connecting Vector Paths (Supervisory Synapses) */}
        {!isMobile && (
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              transform: 'translateZ(-10px)'
            }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="synapseGradientLeft" x1="50%" y1="46%" x2="0%" y2="50%">
                <stop offset="0%" stopColor="rgba(76, 141, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(52, 120, 246, 0.05)" />
              </linearGradient>
              <linearGradient id="synapseGradientRight" x1="50%" y1="46%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgba(76, 141, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(52, 120, 246, 0.05)" />
              </linearGradient>
            </defs>

            {/* Left cluster synapse paths */}
            <path
              d="M 50% 46% Q 25% 35% 12% 34%"
              fill="none"
              stroke="url(#synapseGradientLeft)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              style={{ animation: 'asSynapsePulse 6s linear infinite' }}
            />
            <path
              d="M 50% 46% Q 22% 52% 10% 56%"
              fill="none"
              stroke="url(#synapseGradientLeft)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              style={{ animation: 'asSynapsePulse 6s linear infinite' }}
            />
            <path
              d="M 50% 46% Q 28% 68% 12% 78%"
              fill="none"
              stroke="url(#synapseGradientLeft)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              style={{ animation: 'asSynapsePulse 6s linear infinite' }}
            />

            {/* Right cluster synapse paths */}
            <path
              d="M 50% 46% Q 75% 35% 88% 34%"
              fill="none"
              stroke="url(#synapseGradientRight)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              style={{ animation: 'asSynapsePulse 6s linear infinite' }}
            />
            <path
              d="M 50% 46% Q 78% 52% 90% 56%"
              fill="none"
              stroke="url(#synapseGradientRight)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              style={{ animation: 'asSynapsePulse 6s linear infinite' }}
            />
            <path
              d="M 50% 46% Q 72% 68% 88% 78%"
              fill="none"
              stroke="url(#synapseGradientRight)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              style={{ animation: 'asSynapsePulse 6s linear infinite' }}
            />
          </svg>
        )}

        {/* 4. Authentically Supported Agent Medallions with 3D Depth */}
        {(isMobile ? SUPPORTED_AGENTS.filter(a => ['claude_code', 'codex', 'cursor', 'devin'].includes(a.id)) : SUPPORTED_AGENTS).map((agent) => {
          const posX = isMobile ? agent.mobileX : agent.x;
          const posY = isMobile ? agent.mobileY : agent.y;
          const finalSize = isMobile ? Math.max(Math.round(agent.size * 0.58), 54) : agent.size;
          const logoSize = Math.round(finalSize * 0.44);
          const zDepth = prefersReducedMotion || isMobile ? 0 : agent.z;

          return (
            <div
              key={agent.id}
              className={`as-node-anchor ${prefersReducedMotion ? '' : agent.floatAnimation}`}
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                width: `${finalSize}px`,
                height: `${finalSize}px`,
                transform: `translateZ(${zDepth}px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Inner blooming element */}
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
                {/* Outer subtle glow ring */}
                <div className="as-node-ring" />

                {/* Glass surface with subtle radial gradient reflection */}
                <div className="as-node-content">
                  <ProviderLogo providerId={agent.id} size={logoSize} />
                  <span className="as-node-label">{agent.name}</span>
                </div>

                {/* Identity Tooltip Card */}
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
    </div>
  );
};
