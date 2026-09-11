import React, { useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { ACHIEVEMENTS } from '../../constants/achievements';

export default function AchievementsModal() {
  const { isAchievementsOpen, setIsAchievementsOpen, unlockedAchievements } = useChat();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAchievementsOpen) {
        setIsAchievementsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAchievementsOpen, setIsAchievementsOpen]);

  if (!isAchievementsOpen) return null;

  return (
    <div
      className="modal-backdrop"
      id="achievements-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-achievements-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAchievementsOpen(false);
      }}
    >
      <div className="modal-card achievements-modal-card">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-trophy">🏆</span>
            <div>
              <h2 id="modal-achievements-title">Achievements of Futility</h2>
              <p className="modal-subtitle">Milestones achieved by persistently getting zero assistance.</p>
            </div>
          </div>
          <button
            className="close-modal-btn"
            id="close-achievements-btn"
            aria-label="Close modal"
            onClick={() => setIsAchievementsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body achievements-list-grid" id="achievements-full-list">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedAchievements.has(ach.id);
            return (
              <div key={ach.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon-box">
                  {isUnlocked ? ach.icon : '🔒'}
                </div>
                <div className="achievement-details">
                  <div className="achievement-header-row">
                    <h4 className="achievement-name">{ach.name}</h4>
                    <span
                      className={`achievement-status-badge ${
                        isUnlocked ? 'badge-unlocked' : 'badge-locked'
                      }`}
                    >
                      {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                  </div>
                  <p className="achievement-description">{ach.desc}</p>
                  <span className="achievement-requirement">{ach.requirement}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <span className="modal-footer-tip">Tip: Keep asking questions to reach total self-reliance.</span>
          <button
            className="action-btn secondary-action"
            id="close-achievements-footer-btn"
            onClick={() => setIsAchievementsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
