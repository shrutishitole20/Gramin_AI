import React from 'react';
import ChatbotInterface from './ChatbotInterface';
import './ChatbotModal.css';

const ChatbotModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="chatbot-modal-overlay" onClick={onClose}>
      <div 
        className="chatbot-modal-container glass-panel animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative' }}
      >
        <button 
          id="gramin-ai-close-trigger" 
          onClick={onClose}
          aria-label="Close Assistant"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <ChatbotInterface isModal={true} onClose={onClose} />
      </div>
    </div>
  );
};

export default ChatbotModal;
