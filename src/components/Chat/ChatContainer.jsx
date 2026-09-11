import React, { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import QuickPrompts from './QuickPrompts';
import SpecialActions from './SpecialActions';
import ChatInput from './ChatInput';

export default function ChatContainer() {
  const { messages, isTyping, sendMessage } = useChat();
  const chatHistoryRef = useRef(null);

  // Auto-scroll to bottom whenever messages array or typing state updates
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <section className="chat-section" aria-label="Conversation Window">
      {/* Chat Message Stream */}
      <div
        className="chat-history"
        id="chat-history"
        role="log"
        aria-live="polite"
        aria-label="Message stream"
        ref={chatHistoryRef}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Animated Typing Indicator */}
        <TypingIndicator />
      </div>

      {/* Quick Prompts Chips */}
      <QuickPrompts onSelectPrompt={(prompt) => sendMessage(prompt)} />

      {/* Secondary Action Buttons */}
      <SpecialActions />

      {/* Chat Input Form */}
      <ChatInput />
    </section>
  );
}
