import React, { useState, useRef, useEffect } from 'react';
import { askChatBotAi } from '../utils/ai';

export default function ChatBot({ profileContext, apiKey, provider, model, showConfirm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your Fitora AI coach. Ask me anything about your diet plan, ingredients, workouts, or general health goals!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderMessageContent = (text) => {
    if (!text) return '';
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} style={{ fontWeight: '700', color: '#ffffff' }}>{part}</strong>;
      }
      return part.replace(/\*/g, '');
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleClear = async () => {
    const confirmed = showConfirm 
      ? await showConfirm('Are you sure you want to clear your chat history?', 'Clear Chat History')
      : window.confirm('Are you sure you want to clear your chat history?');

    if (confirmed) {
      setMessages([
        {
          role: 'assistant',
          content: "Hello! I'm your Fitora AI coach. Ask me anything about your diet plan, ingredients, workouts, or general health goals!"
        }
      ]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      if (!apiKey) {
        throw new Error("Please set VITE_GROQ_API_KEY in your .env configuration file to chat with the AI coach.");
      }
      
      const reply = await askChatBotAi({
        messages: newMessages,
        profileContext,
        apiKey,
        provider,
        model
      });

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${err.message || 'Something went wrong. Please check your network or API Settings.'}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--accent-coral)',
          border: 'none',
          boxShadow: '0 8px 24px rgba(255, 125, 112, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          color: 'white',
          transition: 'transform 0.2s ease, background 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Chat with AI Coach"
        id="chatbot-trigger-btn"
      >
        {isOpen ? '✕' : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel chatbot-window">
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 125, 112, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: 'var(--accent-coral)' }}><path d="M19 8h-1.18c-.46-2.28-2.48-4-4.82-4-.83 0-1.62.24-2.3.66L9.66 3.62C9.44 3.4 9.11 3.4 8.89 3.62L7.48 5.03c-.22.22-.22.56 0 .78l1.35 1.35C8.34 8.01 8 9.07 8 10.22c0 2.34 1.72 4.36 4 4.82V17h-2c-1.1 0-2 .9-2 2v2h8v-2c0-1.1-.9-2-2-2h-2v-1.96c2.28-.46 4-2.48 4-4.82 0-1.15-.34-2.21-.83-3.05l1.35-1.35c.22-.22.22-.56 0-.78L19 8zM12 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
              </span>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700' }}>Fitora Coach</h4>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Online & Ready</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear Chat"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'color 0.2s ease, background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-coral)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: '1.25rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {messages.map((m, idx) => {
              const isAssistant = m.role === 'assistant';
              return (
                <div
                  key={idx}
                  style={{
                    alignSelf: isAssistant ? 'flex-start' : 'flex-end',
                    maxWidth: '80%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    background: isAssistant ? 'rgba(255, 255, 255, 0.05)' : 'var(--accent-coral)',
                    color: isAssistant ? 'var(--text-primary)' : 'white',
                    border: isAssistant ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {renderMessageContent(m.content)}
                </div>
              );
            })}
            
            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  gap: '0.25rem',
                  alignItems: 'center',
                }}
              >
                <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'typing 1.4s infinite' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'typing 1.4s infinite 0.2s' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'typing 1.4s infinite 0.4s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                background: '#090a0f',
                border: '1px solid #232733',
                borderRadius: '6px',
                padding: '0.5rem 0.75rem',
                color: 'white',
                fontSize: '0.85rem',
              }}
              disabled={loading}
              id="chatbot-input-field"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: 'var(--accent-coral)',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                opacity: (loading || !input.trim()) ? 0.5 : 1,
              }}
              id="chatbot-send-btn"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
