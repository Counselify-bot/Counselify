import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { sendChatMessage, getWelcomeMessage } from '../utils/chatbotService';
import './Chatbot.css';

// ── Quick action chips shown above input ─────────────────────────────
const QUICK_CHIPS = [
  { label: 'Predict my college', message: 'I want to predict my college' },
  { label: 'JoSAA help', message: 'Tell me about JoSAA counselling' },
  { label: 'CSAB doubts', message: 'I have doubts about CSAB special rounds' },
  { label: 'JAC Delhi', message: 'Tell me about JAC Delhi counselling' },
  { label: 'Deadlines', message: 'What are the important deadlines?' },
  { label: 'Services', message: 'What services does Counselify offer?' },
  { label: 'Latest updates', message: 'What are the latest news and updates?' },
];

// ── Parse simple markdown-like text for bot messages ─────────────────
function formatBotText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

// ── Format timestamp ─────────────────────────────────────────────────
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // ── Toggle chat window ─────────────────────────────────────────────
  const toggleChat = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 250);
    } else {
      setIsOpen(true);
      // Show welcome message on first open
      if (!hasOpened) {
        setHasOpened(true);
        const welcome = getWelcomeMessage(location.pathname);
        setMessages([{
          id: Date.now(),
          type: 'bot',
          text: welcome.reply,
          time: new Date(),
          actions: welcome.suggestedActions,
        }]);
      }
    }
  };

  // ── Send a message ─────────────────────────────────────────────────
  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      time: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history
      const history = messages.map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const response = await sendChatMessage(
        messageText,
        location.pathname,
        history
      );

      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.reply,
        time: new Date(),
        actions: response.suggestedActions || [],
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const errorMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Oops! Something went wrong. Please try again in a moment. 🙏',
        time: new Date(),
        actions: [],
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Handle CTA action click ────────────────────────────────────────
  const handleAction = (action) => {
    if (action.route) {
      navigate(action.route);
      // Close chat on mobile after navigation
      if (window.innerWidth < 640) {
        toggleChat();
      }
    }
  };

  // ── Handle chip click ──────────────────────────────────────────────
  const handleChipClick = (chip) => {
    handleSend(chip.message);
  };

  return (
    <>
      {/* ── Chat Window ── */}
      {isOpen && (
        <div className={`chatbot-window ${isClosing ? 'closing' : ''}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">
              <Sparkles size={20} />
            </div>
            <div className="chatbot-header-info">
              <div className="chatbot-header-title">Counselify AI Assistant</div>
              <div className="chatbot-header-subtitle">
                JEE counselling, colleges, cutoffs, JoSAA, CSAB, JAC Delhi
              </div>
            </div>
            <button className="chatbot-header-close" onClick={toggleChat} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg ${msg.type}`}>
                <div
                  className="chatbot-msg-bubble"
                  dangerouslySetInnerHTML={
                    msg.type === 'bot'
                      ? { __html: formatBotText(msg.text) }
                      : undefined
                  }
                >
                  {msg.type === 'user' ? msg.text : undefined}
                </div>

                {/* Suggested actions */}
                {msg.type === 'bot' && msg.actions && msg.actions.length > 0 && (
                  <div className="chatbot-actions">
                    {msg.actions.map((action, i) => (
                      <button
                        key={i}
                        className="chatbot-action-btn"
                        onClick={() => handleAction(action)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="chatbot-msg-time">{formatTime(msg.time)}</div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="chatbot-typing">
                <div className="chatbot-typing-dot" />
                <div className="chatbot-typing-dot" />
                <div className="chatbot-typing-dot" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips */}
          {messages.length <= 1 && (
            <div className="chatbot-chips">
              {QUICK_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  className="chatbot-chip"
                  onClick={() => handleChipClick(chip)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              className="chatbot-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>

          {/* Footer */}
          <div className="chatbot-powered">
            Powered by Counselify AI
          </div>
        </div>
      )}

      {/* ── Floating Trigger Button ── */}
      <button
        className={`chatbot-trigger ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open Counselify AI Chat'}
      >
        {!isOpen && <div className="chatbot-trigger-pulse" />}
        <span className="trigger-icon">
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </span>
      </button>
    </>
  );
};

export default Chatbot;
