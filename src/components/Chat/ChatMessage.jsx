import React from 'react';
import { useChat } from '../../context/ChatContext';

export default function ChatMessage({ message }) {
  const { id, sender, text, refusalLevel, timestamp } = message;
  const { activeSpeakingId, toggleSpeak } = useChat();

  const isAI = sender === 'ai';
  const isSpeaking = activeSpeakingId === id;
  const paragraphs = (text || '').split('\n\n');

  return (
    <div className={`chat-message-row ${isAI ? 'ai-message' : 'user-message'}`}>
      {/* Avatar */}
      <div className={`message-avatar ${isAI ? 'ai-avatar' : 'user-avatar'}`}>
        {isAI ? <span className="avatar-spark">✦</span> : 'YOU'}
      </div>

      {/* Content Wrapper */}
      <div className="message-content-wrapper">
        <div className="message-bubble">
          {paragraphs.map((para, idx) => (
            <p key={idx} style={{ marginTop: idx > 0 ? '0.5rem' : 0 }}>
              {para}
            </p>
          ))}
        </div>

        {/* Message Meta */}
        <div className="message-meta">
          <span>{timestamp}</span>

          {isAI && refusalLevel && (
            <span className="refusal-level-tag">{refusalLevel}</span>
          )}

          {isAI && (
            <button
              type="button"
              className={`speak-msg-btn ${isSpeaking ? 'speaking' : ''}`}
              title={isSpeaking ? 'Stop speech' : 'Read response aloud'}
              aria-label={isSpeaking ? 'Stop speech' : 'Read response aloud'}
              onClick={() => toggleSpeak(id, text)}
            >
              <svg
                className="speaker-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
