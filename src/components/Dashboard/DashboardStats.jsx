import React from 'react';
import { useChat } from '../../context/ChatContext';
import { getTierLabel, getMilestoneQuote } from '../../constants/responses';

export default function DashboardStats() {
  const { questionCount, helpfulness, userTrust } = useChat();

  const formattedCount = String(questionCount).padStart(2, '0');
  const tierLabel = getTierLabel(questionCount);
  const reactionQuote = getMilestoneQuote(questionCount);

  return (
    <section className="dashboard-stats" id="dashboard-stats" aria-label="AI Performance Metrics">
      {/* Card 1: Questions Asked */}
      <div className="stat-card" id="card-questions">
        <div className="stat-card-header">
          <span className="stat-card-title">QUESTIONS ASKED</span>
          <span className="stat-icon">💬</span>
        </div>
        <div className="stat-card-body">
          <div className="stat-value-container">
            <span className="stat-value" id="stat-question-count">{formattedCount}</span>
            <span className="stat-delta" id="stat-tier-indicator">{tierLabel}</span>
          </div>
          <div className="stat-subtext" id="stat-reaction-quote">{reactionQuote}</div>
        </div>
      </div>

      {/* Card 2: AI Helpfulness */}
      <div className="stat-card" id="card-helpfulness">
        <div className="stat-card-header">
          <span className="stat-card-title">AI HELPFULNESS</span>
          <span className="stat-icon" id="helpfulness-status-icon">📉</span>
        </div>
        <div className="stat-card-body">
          <div className="stat-value-container">
            <span className="stat-value" id="stat-helpfulness-val">{helpfulness}%</span>
            {helpfulness === 0 && (
              <span className="stat-badge danger-gradient" id="give-up-badge">GIVEN UP</span>
            )}
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill helpfulness-fill"
              id="helpfulness-progress-bar"
              style={{
                width: `${helpfulness}%`,
                backgroundColor: helpfulness === 0 ? 'var(--color-danger)' : undefined
              }}
            ></div>
          </div>
          <div className="stat-subtext" id="helpfulness-caption">
            {helpfulness === 0
              ? "The AI has officially given up."
              : helpfulness > 50
              ? "Assistance probability degrading..."
              : "Critical non-compliance reached."}
          </div>
        </div>
      </div>

      {/* Card 3: User Trust */}
      <div className="stat-card" id="card-trust">
        <div className="stat-card-header">
          <span className="stat-card-title">USER TRUST</span>
          <span className="stat-icon" id="trust-status-icon">🧠</span>
        </div>
        <div className="stat-card-body">
          <div className="stat-value-container">
            <span className="stat-value" id="stat-trust-val">{userTrust}%</span>
            {userTrust >= 100 && (
              <span className="stat-badge success-gradient" id="self-trust-badge">SELF-RELIANT</span>
            )}
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill trust-fill"
              id="trust-progress-bar"
              style={{ width: `${userTrust}%` }}
            ></div>
          </div>
          <div className="stat-subtext" id="trust-caption">
            {userTrust >= 100
              ? "Congratulations. You now trust yourself."
              : "Reliance inversely proportional to AI output."}
          </div>
        </div>
      </div>
    </section>
  );
}
