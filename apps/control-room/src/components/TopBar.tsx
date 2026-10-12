import React from 'react';
import { 
  Search, 
  Plus, 
  FlaskConical, 
  RefreshCw, 
  Layers,
  Sparkles,
  Cpu,
  Radio
} from 'lucide-react';

interface TopBarProps {
  onOpenCommandPalette: () => void;
  onOpenCreateMission: () => void;
  onSeedDemo: () => void;
  isSeeding: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenHud?: () => void;
  onNavigateToLanding?: () => void;
  wsConnected?: boolean;
  wsLatency?: number | null;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenCommandPalette,
  onOpenCreateMission,
  onSeedDemo,
  isSeeding,
  onRefresh,
  isRefreshing,
  onOpenHud,
  onNavigateToLanding,
  wsConnected = true,
  wsLatency = 12
}) => {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        {/* Command Search Trigger */}
        <button 
          className="search-trigger" 
          onClick={onOpenCommandPalette}
          title="Search missions, agents, or run commands (Ctrl+K / ⌘K)"
        >
          <Search size={14} />
          <span>Search or command...</span>
          <span className="kbd-shortcut">⌘K</span>
        </button>

        {/* Live Supervisory Vitals Pill */}
        <div 
          className="status-pill"
          style={{ 
            fontSize: '11.5px', 
            padding: '4px 10px',
            backgroundColor: 'rgba(56, 189, 248, 0.06)',
            borderColor: 'rgba(56, 189, 248, 0.2)'
          }}
          title="Supervisory Nervous System Event Pipeline & Real-Time Watchdogs"
        >
          <Radio size={12} color="var(--primary)" className={wsConnected ? 'spin' : ''} style={{ animationDuration: '4s' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Supervisory Bus:</span>
          <span style={{ color: wsConnected ? 'var(--primary)' : 'var(--danger)', fontWeight: 600 }}>
            {wsConnected ? `Live (${wsLatency ?? 14}ms)` : 'Offline'}
          </span>
        </div>

        {/* Cognitive Model Engine Indicator */}
        <div 
          className="status-pill"
          style={{ 
            fontSize: '11px', 
            padding: '4px 9px',
            backgroundColor: 'rgba(168, 85, 247, 0.06)',
            borderColor: 'rgba(168, 85, 247, 0.2)',
            display: 'none'
          }}
          id="topbar-gemma-pill"
          title="Supervisory Intelligence: Google Gemma 4 (gemma-4-31B-it)"
        >
          <Cpu size={12} color="var(--purple)" />
          <span style={{ color: '#c084fc', fontWeight: 600 }}>Gemma 4</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Refresh */}
        <button
          className="btn btn-ghost btn-sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Sync state with authoritative backend"
        >
          <RefreshCw size={13} className={isRefreshing ? 'spin' : ''} />
          <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
        </button>

        {/* Demo Scenario Button */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={onSeedDemo}
          disabled={isSeeding}
          title="Load deterministic demonstration scenario (Authentication test loop & handoff)"
        >
          <FlaskConical size={13} color="var(--warning)" />
          <span>{isSeeding ? 'Seeding...' : 'Demo Scenario'}</span>
        </button>

        {/* Start Mission Button */}
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenCreateMission}
          title="Start a new supervised autonomous mission"
        >
          <Plus size={14} />
          <span>Start a Mission</span>
        </button>

        {/* Landing Page Launcher */}
        {onNavigateToLanding && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={onNavigateToLanding}
            title="View AI Supervisor Landing Page"
            style={{ color: 'var(--primary)' }}
          >
            <Sparkles size={13} />
            <span>Landing Page</span>
          </button>
        )}

        {/* HUD Launcher */}
        {onOpenHud && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={onOpenHud}
            title="Open Floating HUD window"
          >
            <Layers size={13} />
            <span>HUD</span>
          </button>
        )}
      </div>
    </header>
  );
};
