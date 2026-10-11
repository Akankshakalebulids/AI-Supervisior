import React from 'react';
import { 
  Search, 
  Plus, 
  FlaskConical, 
  RefreshCw, 
  Layers,
  Sparkles
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
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenCommandPalette,
  onOpenCreateMission,
  onSeedDemo,
  isSeeding,
  onRefresh,
  isRefreshing,
  onOpenHud,
  onNavigateToLanding
}) => {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        {/* Command Search Trigger */}
        <button 
          className="search-trigger" 
          onClick={onOpenCommandPalette}
          title="Search or run commands (Ctrl+K / ⌘K)"
        >
          <Search size={14} />
          <span>Search or command...</span>
          <span className="kbd-shortcut">⌘K</span>
        </button>
      </div>

      <div className="topbar-right">
        {/* Refresh */}
        <button
          className="btn btn-ghost btn-sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Sync with authoritative local backend"
        >
          <RefreshCw size={13} className={isRefreshing ? 'spin' : ''} />
          <span>{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
        </button>

        {/* Demo Scenario Button (Honest tag) */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={onSeedDemo}
          disabled={isSeeding}
          title="Load deterministic demonstration scenario (Authentication test loop & handoff)"
        >
          <FlaskConical size={13} />
          <span>{isSeeding ? 'Seeding demo...' : 'Demo Scenario'}</span>
        </button>

        {/* Start Mission Button */}
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenCreateMission}
          title="Start a new supervised mission"
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
          >
            <Sparkles size={13} color="var(--primary)" />
            <span>Landing Page</span>
          </button>
        )}

        {/* HUD Launcher (if supported) */}
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
