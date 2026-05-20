import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatbotModal from './ChatbotModal';
import './FloatingChatbot.css';

const FloatingChatbot = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="floating-chatbot-btn" 
        title={t('chatbot_title', 'Chat with Gramin AI')}
      >
        <div className="pulse-ring"></div>
        <img 
          src={process.env.PUBLIC_URL + "/chabot.webp"} 
          alt="Gramin AI Bot" 
          className="bot-image" 
        />
        <div className="tooltip">{t('chatbot_tooltip', 'Ask AI Hub')}</div>
      </button>

      <ChatbotModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default FloatingChatbot;
