import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { isSpeechRecognitionSupported, createSpeechRecognizer } from '../../services/speechService';
import { soundFx } from '../../services/audioService';

export default function ChatInput() {
  const { isTyping, sendMessage, soundEnabled, showToast } = useChat();
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);
  const recognizerRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [text]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognizerRef.current) {
        try {
          recognizerRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (isTyping || !text.trim()) return;

    if (isListening && recognizerRef.current) {
      recognizerRef.current.stop();
      setIsListening(false);
    }

    sendMessage(text);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    if (!isSpeechRecognitionSupported()) {
      showToast('Voice Input Unavailable', "Voice input isn't available in this browser. The AI is disappointed.");
      return;
    }

    if (isListening) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognizer = createSpeechRecognizer({
      onStart: () => {
        setIsListening(true);
        soundFx.click(soundEnabled);
      },
      onResult: (transcript) => {
        if (transcript) {
          setText(transcript);
        }
      },
      onError: (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          showToast('Microphone Access Denied', 'Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          showToast('No Speech Heard', 'Nothing was detected. The AI appreciates your silence.');
        } else if (event.error !== 'aborted') {
          showToast('Voice Input Notice', `Speech recognition error: ${event.error}`);
        }
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (recognizer) {
      recognizerRef.current = recognizer;
      try {
        recognizer.start();
      } catch (err) {
        console.warn('Recognition start retry:', err);
        recognizer.stop();
        setTimeout(() => {
          try { recognizer.start(); } catch (e) {}
        }, 150);
      }
    }
  };

  return (
    <form className="chat-input-container" id="chat-form" onSubmit={handleSend}>
      {/* Listening Status Indicator */}
      {isListening && (
        <div id="listening-indicator" className="listening-indicator" aria-live="polite">
          <span className="listening-pulse-dot"></span>
          <span id="listening-text" className="listening-text">Listening... Speak now</span>
          <span className="listening-subtext">(Click mic again to cancel)</span>
        </div>
      )}

      <div className="input-wrapper">
        <button
          type="button"
          id="mic-btn"
          className={`mic-button ${isListening ? 'listening' : ''}`}
          title={isListening ? 'Listening... Click to cancel' : 'Voice Input (Microphone)'}
          aria-label="Voice Input (Microphone)"
          onClick={toggleListening}
        >
          <svg className="mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          id="user-input"
          className="chat-textarea"
          rows="1"
          placeholder={isListening ? 'Listening...' : 'Ask me something you probably already know…'}
          aria-label="Your question for NoHelp AI"
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="submit"
          id="send-btn"
          className="send-button"
          title="Send message (Enter)"
          aria-label="Send Message"
          disabled={isTyping || !text.trim()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>

      <div className="input-hint">
        <span>Press <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for newline</span>
        <span className="char-counter" id="char-counter">{text.length}/1000</span>
      </div>
    </form>
  );
}
