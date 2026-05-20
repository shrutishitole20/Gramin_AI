import React from 'react';
import { useTranslation } from 'react-i18next';
import ChatbotInterface from '../components/ChatbotInterface';
import './Chatbot.css';

const Chatbot = () => {
  const { t } = useTranslation();
  return (
    <div className="chatbot-page">
      <div className="container chatbot-container">
        <div className="chatbot-sidebar reveal">
           <div className="sidebar-header">
              <span className="section-tag">{t('bot_interface', 'Agentic Interface')}</span>
              <h1>{t('bot_lab_title', 'Rural AI Laboratory')}</h1>
              <p>{t('bot_lab_desc', 'Direct interaction with our decentralized intelligence models.')}</p>
           </div>
           <div className="sidebar-stats glass-panel">
              <div className="bot-stat">
                 <span>{t('bot_stat_latency', 'Latency')}</span>
                 <strong>12ms</strong>
              </div>
              <div className="bot-stat">
                 <span>{t('bot_stat_model', 'Model')}</span>
                 <strong>Gramin-v4</strong>
              </div>
           </div>
        </div>

        {/* Use the shared interface component */}
        <ChatbotInterface isModal={false} />
      </div>
      
      {/* Abstract Background Elements purely CSS */}
      <div className="bg-neural-glow"></div>
    </div>
  );
};

export default Chatbot;
