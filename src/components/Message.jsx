import { useEffect } from 'react';

const Message = ({ message, speak, updateMessage }) => {
  useEffect(() => {
    if (message.sender === 'ai'  && message.isNew) {
      speak(message.text);

      setTimeout(() => updateMessage(message.id, 
        { ...message, isNew: false }), 1000);
    }
  }, [message, speak, updateMessage]);

  return (
    <div className={`message ${message.sender}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <button onClick={() => speak(message.text)}>🔊 Read Aloud</button>
      </div>
    </div>
  );
};

export default Message;