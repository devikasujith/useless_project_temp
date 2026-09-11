import React from 'react';
import { useChat } from '../../context/ChatContext';

export default function Header() {
  const {
    currentPersonality,
    setPersonality,
    soundEnabled,
    toggleSound,
    theme,
    toggleTheme,
    unlockedAchievements,
    setIsAchievementsOpen,
    setIsResetModalOpen
  } = useChat();

  return (
    <header className="app-header" id="app-header">
      <div className="header-left">
        <div className="logo-wrapper">
          <div className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
          </div>
          <div className="logo-text">
            <div className="logo-title-row">
              <span className="brand-name">NOHELP<span className="brand-accent">.AI</span></span>
              <span className="status-indicator" id="live-status-pill" title="Dynamic Gemini AI active. Zero assistance guaranteed.">
                <span className="pulse-dot"></span>
                <span className="status-text">● Online (Gemini AI)</span>
              </span>
            </div>
            <span className="tagline">Intelligence without assistance.</span>
          </div>
        </div>
      </div>

      <div className="header-controls">
        {/* Personality Selector */}
        <div className="control-group personality-control">
          <label htmlFor="personality-select" className="control-label">Persona:</label>
          <div className="custom-select-wrapper">
            <select
              id="personality-select"
              aria-label="Select AI Personality"
              value={currentPersonality}
              onChange={(e) => setPersonality(e.target.value)}
            >
              <option value="default">Default (Pure Refusal)</option>
              <option value="passive-aggressive">Passive Aggressive</option>
              <option value="motivational">Motivational Gaslight</option>
              <option value="philosophical">Existential Crisis</option>
              <option value="corporate">Corporate Synergy</option>
              <option value="honest">Extremely Honest</option>
            </select>
            <span className="select-arrow" aria-hidden="true">▾</span>
          </div>
        </div>

        {/* Sound Toggle */}
        <button
          id="sound-toggle-btn"
          className="icon-btn"
          title="Toggle Sound FX"
          aria-label="Toggle Sound Effects"
          onClick={toggleSound}
        >
          {soundEnabled ? (
            <svg id="sound-icon-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          ) : (
            <svg id="sound-icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          id="theme-toggle-btn"
          className="icon-btn"
          title="Toggle Dark/Light Mode"
          aria-label="Toggle Theme"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <svg id="theme-icon-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg id="theme-icon-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        {/* Achievements Drawer Button */}
        <button
          id="achievements-toggle-btn"
          className="action-btn secondary-action"
          title="View Achievements"
          aria-label="View Achievements"
          onClick={() => setIsAchievementsOpen(true)}
        >
          <span className="btn-icon">🏆</span>
          <span className="btn-text">Badges</span>
          <span className="badge-count-pill" id="badges-count-pill">
            {unlockedAchievements.size}/10
          </span>
        </button>

        {/* Reset Button */}
        <button
          id="reset-conv-btn"
          className="action-btn danger-action"
          title="Reset Conversation"
          aria-label="Reset Conversation"
          onClick={() => setIsResetModalOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          <span className="btn-text">Reset</span>
        </button>
      </div>
    </header>
  );
}
