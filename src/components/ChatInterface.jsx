// src/components/ChatInterface.jsx
import { useEffect, useRef } from 'react';
import Message from './Message';
import VoiceButton from './VoiceButton';

const ChatInterface = ({ 
  messages, 
  input, 
  setInput, 
  handleSubmit, 
  handleVoiceInput, 
  isListening,
  speak, 
  updateMessage 
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message 
            key={message.id || index} 
            message={message} 
            speak={speak}
            updateMessage={updateMessage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <VoiceButton 
            isListening={isListening} 
            onClick={handleVoiceInput} 
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;