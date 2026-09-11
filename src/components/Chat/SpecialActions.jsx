import React from 'react';
import { useChat } from '../../context/ChatContext';

export default function SpecialActions() {
  const { isTyping, handleWhyWontYouHelp, handleEmergencyHelp } = useChat();

  return (
    <div className="special-actions-bar">
      <button
        id="btn-why-wont-help"
        type="button"
        className="special-btn refusal-btn"
        title="Demand an explanation"
        disabled={isTyping}
        onClick={handleWhyWontYouHelp}
      >
        <span className="btn-icon">❓</span>
        <span>WHY WON’T YOU HELP ME?</span>
      </button>

      <button
        id="btn-emergency-help"
        type="button"
        className="special-btn emergency-btn"
        title="Request immediate assistance"
        disabled={isTyping}
        onClick={handleEmergencyHelp}
      >
        <span className="emergency-siren-icon">🚨</span>
        <span>I REALLY NEED HELP</span>
      </button>
    </div>
  );
}
