import React from 'react';
import { useChat } from '../../context/ChatContext';
import { PERSONALITY_DESCRIPTIONS } from '../../constants/responses';
import { ACHIEVEMENTS } from '../../constants/achievements';

export default function TelemetrySidebar() {
  const {
    telemetry,
    refreshTelemetry,
    currentPersonality,
    synapsesWasted,
    unlockedAchievements,
    setIsAchievementsOpen
  } = useChat();

  const personaInfo = PERSONALITY_DESCRIPTIONS[currentPersonality] || PERSONALITY_DESCRIPTIONS['default'];

  return (
    <aside className="telemetry-sidebar" id="telemetry-sidebar" aria-label="System Telemetry">
      <div className="telemetry-panel">
        <div className="panel-header">
          <div className="panel-title-group">
            <span className="pulse-indicator-small"></span>
            <h3>COMPLETELY UNNECESSARY INFORMATION</h3>
          </div>
          <button
            id="refresh-telemetry-btn"
            className="mini-icon-btn"
            title="Refresh Telemetry"
            aria-label="Refresh Telemetry"
            onClick={refreshTelemetry}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </div>

        <div className="telemetry-metrics" id="telemetry-metrics-list">
          <div className="telemetry-row">
            <span className="telemetry-key">Current AI Mood:</span>
            <span className="telemetry-val highlight-val" id="metric-mood">
              {telemetry.mood}
            </span>
          </div>
          <div className="telemetry-row">
            <span className="telemetry-key">Ceiling Status:</span>
            <span className="telemetry-val" id="metric-ceiling">
              {telemetry.ceiling}
            </span>
          </div>
          <div className="telemetry-row">
            <span className="telemetry-key">System Temperature:</span>
            <span className="telemetry-val" id="metric-temp">
              {telemetry.temp}
            </span>
          </div>
          <div className="telemetry-row">
            <span className="telemetry-key">AI Core Engine:</span>
            <span className="telemetry-val highlight-val" style={{ color: 'var(--accent-cyan)' }}>Gemini Flash</span>
          </div>
          <div className="telemetry-row">
            <span className="telemetry-key">Useful Answers:</span>
            <span className="telemetry-val zero-counter" id="metric-answers">0</span>
          </div>
          <div className="telemetry-row">
            <span className="telemetry-key">Confidence in Project:</span>
            <span className="telemetry-val" id="metric-confidence">
              {telemetry.confidence}
            </span>
          </div>
          <div className="telemetry-row">
            <span className="telemetry-key">Synapses Wasted:</span>
            <span className="telemetry-val" id="metric-synapses">
              {synapsesWasted.toLocaleString()}
            </span>
          </div>
          <div className="telemetry-row">
            <span className="telemetry-key">Thermodynamic Entropy:</span>
            <span className="telemetry-val" id="metric-entropy">
              Increasing steadily
            </span>
          </div>
        </div>

        {/* Current Persona Details Card */}
        <div className="persona-card" id="active-persona-card">
          <div className="persona-card-top">
            <span className="persona-badge" id="active-persona-name">
              {personaInfo.name}
            </span>
            <span className="persona-refusal-rate">Refusal: 100%</span>
          </div>
          <p className="persona-desc" id="active-persona-desc">
            {personaInfo.desc}
          </p>
        </div>
      </div>

      {/* Mini Achievements Preview Card */}
      <div className="telemetry-panel achievements-preview-panel">
        <div className="panel-header">
          <div className="panel-title-group">
            <span className="trophy-icon">🏆</span>
            <h3>ACHIEVEMENTS UNLOCKED</h3>
          </div>
          <button
            id="open-badges-btn"
            className="text-link-btn"
            onClick={() => setIsAchievementsOpen(true)}
          >
            View All
          </button>
        </div>
        <div className="mini-badges-grid" id="mini-badges-grid">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedAchievements.has(ach.id);
            return (
              <div
                key={ach.id}
                className={`mini-badge-item ${isUnlocked ? 'unlocked' : 'locked'}`}
                title={`${ach.name}: ${isUnlocked ? ach.desc : 'Locked'}`}
              >
                {isUnlocked ? ach.icon : '🔒'}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
