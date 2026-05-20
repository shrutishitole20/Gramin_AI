import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import chatbotData from '../ChatBot.json';
import '../pages/Chatbot.css';

const ChatbotInterface = ({ isModal = false, onClose }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language === 'mr' ? 'mr' : (i18n.language === 'hi' ? 'hi' : 'en'));
  const [suggestions, setSuggestions] = useState([]);
  
  const translations = {
    en: {
      placeholder: "Ask me a question about Gramin AI...",
      noMatch: "For more details visit our website: https://tdtl.world/",
      morning: "Good Morning",
      afternoon: "Good Afternoon",
      evening: "Good Evening",
      welcome: "Namaste! I am Gramin Agentic Intelligence.",
      timeInfo: "The current time is",
      dateInfo: "and today's date is",
      suggestionLabel: "Try asking about:"
    },
    hi: {
      placeholder: "ग्रामीण एआई के बारे में सवाल पूछें...",
      noMatch: "अधिक जानकारी के लिए हमारे वेबसाइट पर जाएं: https://tdtl.world/",
      morning: "शुभ प्रभात",
      afternoon: "नमस्कार",
      evening: "शुभ संध्या",
      welcome: "नमस्ते! मैं ग्रामीण एजेंटिक इंटेलिजेंस हूं।",
      timeInfo: "अभी समय है",
      dateInfo: "और आज की तारीख है",
      suggestionLabel: "इनके बारे में पूछें:"
    },
    mr: {
      placeholder: "मला ग्रामीण एआय बद्दल काहीही विचारा...",
      noMatch: "अधिक माहितीसाठी आमच्या वेबसाइटला भेट द्या: https://tdtl.world/",
      morning: "शुभ प्रभात",
      afternoon: "नमस्कार",
      evening: "शुभ संध्या",
      welcome: "नमस्ते! मी ग्रामीण एजेंटिक इंटेलिजन्स आहे.",
      timeInfo: "आताची वेळ आहे",
      dateInfo: "आणि आजची तारीख आहे",
      suggestionLabel: "यांच्याबद्दल विचारून पहा:"
    }
  };

  const getTimedGreeting = (lang) => {
    const hour = new Date().getHours();
    const trans = translations[lang];
    let timeGreeting = trans.morning;
    if (hour >= 12 && hour < 17) timeGreeting = trans.afternoon;
    if (hour >= 17 || hour < 4) timeGreeting = trans.evening;
    return `${timeGreeting}! ${trans.welcome}`;
  };

  const currentLocale = language === 'mr' ? 'mr-IN' : (language === 'hi' ? 'hi-IN' : 'en-US');

  // Helper to render text with clickable links
  const renderMessageText = (text) => {
    // Regex to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="chat-link">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: getTimedGreeting(language), 
      sender: 'bot', 
      time: new Date().toLocaleTimeString(currentLocale, { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  const refreshSuggestions = (lang) => {
    const allQuestions = chatbotData.chatbot_data.map(item => item.question[lang]);
    setSuggestions(allQuestions);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const marqueeRef = useRef(null);

  const scrollMarquee = (direction) => {
    if (marqueeRef.current) {
      const scrollAmount = 250;
      marqueeRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const activeLang = i18n.language === 'mr' ? 'mr' : (i18n.language === 'hi' ? 'hi' : 'en');
    setLanguage(activeLang);
  }, [i18n.language]);

  useEffect(() => {
    refreshSuggestions(language);
    if (messages.length === 1) {
      setMessages([{
        id: 1,
        text: getTimedGreeting(language),
        sender: 'bot',
        time: new Date().toLocaleTimeString(currentLocale, { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [language]);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const newUserMessage = {
      id: Date.now(), 
      text: messageText, 
      sender: 'user', 
      time: new Date().toLocaleTimeString(currentLocale, { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = messageText.toLowerCase().trim();
      const now = new Date();
      const locale = language === 'mr' ? 'mr-IN' : (language === 'hi' ? 'hi-IN' : 'en-US');
      const currentTime = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
      const currentDate = now.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
      
      let botReply = "";

      // Check for Greetings or Time/Date requests
      const greetings = ["hi", "hello", "namaste", "hey", "gm", "gn", "morning", "evening", "afternoon", "नमस्ते", "नमस्कार", "शुभ"];
      const timeRequests = ["time", "date", "wele", "tariqh", "वेळ", "तारीख", "समय", "दिनांक"];

      const inputWords = lowerInput.replace(/[?.,!]/g, '').split(/\s+/);
      const isGreeting = greetings.some(g => inputWords.includes(g) || lowerInput === g);
      const wantsTime = timeRequests.some(t => inputWords.includes(t) || lowerInput === t);

      if (isGreeting || wantsTime) {
        botReply = `${getTimedGreeting(language)} ${translations[language].timeInfo} ${currentTime} ${translations[language].dateInfo} ${currentDate}.`;
      } else {
        const data = chatbotData.chatbot_data;
        const cleanInput = lowerInput.replace(/[?.,!]/g, '').trim().toLowerCase();
        
        let foundItem = data.find(item => {
          const cleanQ = item.question[language].replace(/[?.,!]/g, '').trim().toLowerCase();
          return cleanQ === cleanInput || cleanInput.includes(cleanQ) || cleanQ.includes(cleanInput);
        });

        // Smart keyword fallback matching
        if (!foundItem) {
          foundItem = data.find(item => {
            const req = item.question?.en?.toLowerCase() || '';
            if (req.includes('sectors') && (cleanInput.includes('sector') || cleanInput.includes('focus') || cleanInput.includes('field'))) return true;
            if (req.includes('register') && (cleanInput.includes('register') || cleanInput.includes('sign up') || cleanInput.includes('join'))) return true;
            if (req.includes('free') && (cleanInput.includes('free') || cleanInput.includes('cost') || cleanInput.includes('fee'))) return true;
            if (req.includes('organizing') && (cleanInput.includes('organizer') || cleanInput.includes('host') || cleanInput.includes('who'))) return true;
            if (req.includes('where') && (cleanInput.includes('where') || cleanInput.includes('venue') || cleanInput.includes('location'))) return true;
            if (req.includes('benefits') && (cleanInput.includes('benefit') || cleanInput.includes('advantage') || cleanInput.includes('why'))) return true;
            return false;
          });
        }

        if (foundItem) {
          const answers = foundItem.answers[language];
          botReply = answers[Math.floor(Math.random() * answers.length)];
        } else {
          botReply = translations[language].noMatch;
        }
      }

      const botResponse = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        time: currentTime
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      refreshSuggestions(language);
    }, 850);
  };

  return (
    <div className={`chatbot-main ${!isModal ? 'glass-panel' : ''}`}>
      <div className="gramin-agent-branding-area">
        <div className="branding-left">
          <div className="status-dot"></div>
          <div className="bot-avatar-wrapper">
            <img src={process.env.PUBLIC_URL + "/chabot.webp"} alt="Gramin AI Logo" />
          </div>
          <div className="branding-text">
            <h3>{t('bot_nav_title', 'Gramin Ai Chatbot')}</h3>
          </div>
        </div>

        {isModal && (
           <div className="language-selector">
             <button onClick={onClose} className="close-bot-btn">✕</button>
           </div>
        )}
      </div>

      <div className="chat-window">
        {messages.map(msg => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className="message-content">
              <p>{renderMessageText(msg.text)}</p>
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper bot">
            <div className="message-content typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        {suggestions.length > 0 && (
          <div className="horizontal-marquee-container">
            <div className="marquee-nav-wrapper">
              <button type="button" className="marquee-nav-btn prev" onClick={() => scrollMarquee('prev')}>
                ‹
              </button>
              
              <div className="suggestions-marquee-h" ref={marqueeRef}>
                <div className="marquee-content-h">
                  {[...suggestions, ...suggestions, ...suggestions].map((s, i) => (
                    <button key={i} className="quick-btn-h" onClick={() => handleSend(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button type="button" className="marquee-nav-btn next" onClick={() => scrollMarquee('next')}>
                ›
              </button>
            </div>
          </div>
        )}
        <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={translations[language].placeholder}
          />
          <Button type="submit" variant="primary">{t('bot_btn_ask', 'Ask')}</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotInterface;
