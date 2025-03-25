import { useChat } from './hooks/useChat';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {


  const {
    messages,
    setMessages,
    input,
    setInput,
    handleSubmit,
    handleVoiceInput,
    isListening,
    speak
  } = useChat();


  const updateMessage = (id, updatedMessage) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === id ? { ...msg, ...updatedMessage } : msg
      )
    );
  };

  return (
    <div className="App">
      <header>
        <h1>AI Assistant</h1>
      </header>
      <ChatInterface
        messages={messages}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleVoiceInput={handleVoiceInput}
        isListening={isListening}
        speak={speak}
        updateMessage={updateMessage}
      />
    </div>
  );
}

export default App;