import React from 'react';
import { useChat } from '../../context/ChatContext';

export default function TypingIndicator() {
  const { isTyping, typingStatus } = useChat();

  if (!isTyping) return null;

  return (
    <div className="typing-indicator-container" aria-live="assertive">
      <div className="message-avatar ai-avatar">
        <span className="avatar-spark">✦</span>
      </div>
      <div className="typing-bubble">
        <div className="typing-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <span className="typing-status-text" id="typing-status-text">
          {typingStatus || 'NoHelp AI is thinking of ways to decline...'}
        </span>
      </div>
    </div>
  );
}
