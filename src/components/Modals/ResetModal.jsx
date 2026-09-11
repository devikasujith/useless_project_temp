import React, { useEffect } from 'react';
import { useChat } from '../../context/ChatContext';

export default function ResetModal() {
  const { isResetModalOpen, setIsResetModalOpen, resetConversation } = useChat();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isResetModalOpen) {
        setIsResetModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResetModalOpen, setIsResetModalOpen]);

  if (!isResetModalOpen) return null;

  return (
    <div
      className="modal-backdrop"
      id="reset-confirm-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-reset-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsResetModalOpen(false);
      }}
    >
      <div className="modal-card reset-modal-card">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-warning-icon">⚠️</span>
            <div>
              <h2 id="modal-reset-title">Reset Conversation?</h2>
              <p className="modal-subtitle">
                This will clear your question history and restore AI helpfulness back to 100% (before it inevitably plunges again).
              </p>
            </div>
          </div>
        </div>
        <div className="modal-footer reset-footer">
          <button
            className="action-btn secondary-action"
            id="cancel-reset-btn"
            onClick={() => setIsResetModalOpen(false)}
          >
            Keep Trying
          </button>
          <button
            className="action-btn danger-action"
            id="confirm-reset-btn"
            onClick={resetConversation}
          >
            Yes, Wipe Everything
          </button>
        </div>
      </div>
    </div>
  );
}
