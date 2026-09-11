import React from 'react';
import { QUICK_PROMPTS } from '../../constants/responses';
import { useChat } from '../../context/ChatContext';

export default function QuickPrompts({ onSelectPrompt }) {
  const { isTyping } = useChat();

  return (
    <div className="quick-prompts-bar" id="quick-prompts-bar">
      <span className="quick-prompts-label">Try asking:</span>
      {QUICK_PROMPTS.map((prompt, idx) => (
        <button
          key={idx}
          type="button"
          className="prompt-chip"
          disabled={isTyping}
          onClick={() => onSelectPrompt && onSelectPrompt(prompt)}
        >
          “{prompt}”
        </button>
      ))}
    </div>
  );
}
