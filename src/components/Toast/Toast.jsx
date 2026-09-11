import React from 'react';
import { useChat } from '../../context/ChatContext';

export default function Toast() {
  const { toast } = useChat();

  if (!toast.show) return null;

  return (
    <div className="toast-notification" id="achievement-toast" role="alert" aria-live="assertive">
      <div className="toast-icon-wrap">
        <span className="toast-trophy">🎖️</span>
      </div>
      <div className="toast-content">
        <span className="toast-tag">{toast.tag}</span>
        <h4 className="toast-title" id="toast-title">{toast.title}</h4>
        <p className="toast-desc" id="toast-desc">{toast.desc}</p>
      </div>
    </div>
  );
}
