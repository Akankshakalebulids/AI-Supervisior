import React, { useState, useEffect, useRef } from 'react';
import { ProviderLogo } from '../ProviderLogo';

interface ConstellationAgent {
  id: string;
  name: string;
  provider: string;
  role: string;
  size: number;
  // Desktop percentage coordinates (% of hero stage)
  x: number;
  y: number;
  // Mobile percentage coordinates
  mobileX: number;
  mobileY: number;
  driftClass: string;
  depthFactor: number; // For mouse parallax
  status: string;
}

const SUPPORTED_FLEET_NODES: ConstellationAgent[] = [
  {
    id: 'claude_code',
    name: 'Claude Code',
    provider: 'Anthropic',
    role: 'Autonomous Code Editing & CLI',
    size: 78,
    x: 14,
    y: 22,
    mobileX: 12,
    mobileY: 8,
    driftClass: 'as-drift-1',
    depthFactor: 0.04,
    status: 'Native Adapter Verified'
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    provider: 'OpenAI',
    role: 'Precision Code Repair & Fallback Handoff',
    size: 72,
    x: 82,
    y: 18,
    mobileX: 84,
    mobileY: 10,
    driftClass: 'as-drift-2',
    depthFactor: 0.035,
    status: 'Native Adapter Verified'
  },
  {
    id: 'gemini',
    name: 'Gemini CLI',
    provider: 'Google',
    role: 'Multimodal Analysis & Architecture Planning',
    size: 70,
    x: 86,
    y: 52,
    mobileX: 86,
    mobileY: 78,
    driftClass: 'as-drift-3',
    depthFactor: 0.045,
    status: 'Native Adapter Verified'
  },
  {
    id: 'hermes',
    name: 'Hermes Agent',
    provider: 'Nous Research',
    role: 'Long-running Autonomous Agent Sessions',
    size: 64,
    x: 10,
    y: 60,
    mobileX: 14,
    mobileY: 76,
    driftClass: 'as-drift-4',
    depthFactor: 0.03,
    status: 'Droplet / Session Ready'
  },
  {
    id: 'digitalocean_managed',
    name: 'DigitalOcean Managed Agent',
    provider: 'DigitalOcean',
    role: 'MicroVM Cloud Sandbox & Action Gateway',
    size: 62,
    x: 25,
    y: 82,
    mobileX: 30,
    mobileY: 88,
    driftClass: 'as-drift-1',
    depthFactor: 0.025,
    status: 'MicroVM Isolation'
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    provider: 'Open-Source',
    role: 'Open Weight Agentic Engine',
    size: 56,
    x: 74,
    y: 78,
    mobileX: 70,
    mobileY: 90,
    driftClass: 'as-drift-2',
    depthFactor: 0.03,
    status: 'Local Runtime Verified'
  },
  {
    id: 'qwen',
    name: 'Qwen Local',
    provider: 'Alibaba Cloud',
    role: 'On-device Local LLM Offline Agent',
    size: 54,
    x: 24,
    y: 12,
    mobileX: 35,
    mobileY: 4,
    driftClass: 'as-drift-3',
    depthFactor: 0.02,
    status: 'Offline Local Runtime'
  },
  {
    id: 'kimi',
    name: 'Kimi Code',
    provider: 'Moonshot AI',
    role: 'Ultra Long-context Code Diagnostics',
    size: 50,
    x: 68,
    y: 14,
    mobileX: 65,
    mobileY: 4,
    driftClass: 'as-drift-4',
    depthFactor: 0.025,
    status: 'Adapter Available'
  },
  {
    id: 'goose',
    name: 'Goose',
    provider: 'Block',
    role: 'Open Extensible On-machine Agent',
    size: 52,
    x: 6,
    y: 40,
    mobileX: 6,
    mobileY: 46,
    driftClass: 'as-drift-1',
    depthFactor: 0.035,
    status: 'Adapter Available'
  },
  {
    id: 'cline',
    name: 'Cline',
    provider: 'Cline',
    role: 'Autonomous Coding & Patching',
    size: 52,
    x: 91,
    y: 35,
    mobileX: 92,
    mobileY: 44,
    driftClass: 'as-drift-2',
    depthFactor: 0.03,
    status: 'Adapter Available'
  }
];

// Atmospheric radiant light satellites echoing reference frames 4 & 5
interface SatelliteOrb {
  x: number;
  y: number;
  size: number;
  colorClass: string;
  driftClass: string;
}

const SATELLITE_ORBS: SatelliteOrb[] = [
  { x: 19, y: 38, size: 26, colorClass: 'as-orb-blue', driftClass: 'as-drift-2' },
  { x: 80, y: 36, size: 30, colorClass: 'as-orb-cyan', driftClass: 'as-drift-1' },
  { x: 30, y: 70, size: 22, colorClass: 'as-orb-royal', driftClass: 'as-drift-4' },
  { x: 70, y: 64, size: 28, colorClass: 'as-orb-blue', driftClass: 'as-drift-3' },
  { x: 48, y: 88, size: 20, colorClass: 'as-orb-cyan', driftClass: 'as-drift-2' },
  { x: 52, y: 8,  size: 24, colorClass: 'as-orb-royal', driftClass: 'as-drift-1' }
];

export const HeroConstellation: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive breakpoint tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 820);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop Mouse Parallax
  useEffect(() => {
    if (isMobile) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMouseOffset({
          x: (e.clientX - centerX),
          y: (e.clientY - centerY)
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div className="as-constellation-stage" ref={containerRef} aria-hidden="false">
      {/* Radiant Satellite Glow Orbs */}
      {SATELLITE_ORBS.map((orb, idx) => (
        <div
          key={`orb-${idx}`}
          className={`as-satellite-orb ${orb.colorClass} ${orb.driftClass}`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            opacity: 0.75,
            transform: `translate3d(${mouseOffset.x * 0.015}px, ${mouseOffset.y * 0.015}px, 0)`
          }}
        />
      ))}

      {/* Dynamic Circular Agent Constellation */}
      {SUPPORTED_FLEET_NODES.map((agent, index) => {
        const posX = isMobile ? agent.mobileX : agent.x;
        const posY = isMobile ? agent.mobileY : agent.y;
        const nodeSize = isMobile ? Math.max(agent.size * 0.78, 42) : agent.size;
        
        // Parallax transform calculation
        const parallaxX = isMobile ? 0 : mouseOffset.x * agent.depthFactor;
        const parallaxY = isMobile ? 0 : mouseOffset.y * agent.depthFactor;

        return (
          <div
            key={agent.id}
            role="button"
            tabIndex={0}
            aria-label={`${agent.name} supported AI agent (${agent.provider})`}
            className={`as-constellation-node as-node-blooming ${agent.driftClass}`}
            style={{
              left: `${posX}%`,
              top: `${posY}%`,
              width: `${nodeSize}px`,
              height: `${nodeSize}px`,
              animationDelay: `${0.1 + index * 0.06}s`,
              transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
            }}
          >
            <div className="as-node-inner">
              <ProviderLogo providerId={agent.id} size={Math.round(nodeSize * 0.52)} />
            </div>

            {/* Accessible Hover / Focus Tooltip */}
            <div className="as-node-tooltip" role="tooltip">
              <span className="as-node-tooltip-title">
                {agent.name}
              </span>
              <span className="as-node-tooltip-sub">{agent.provider} • {agent.role}</span>
              <span className="as-node-tooltip-tag">{agent.status}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
