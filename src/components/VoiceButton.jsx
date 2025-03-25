const VoiceButton = ({ isListening, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className={`voice-button ${isListening ? 'listening' : ''}`}
      aria-label={isListening ? "Stop listening" : "Start voice input"}
    >
      {isListening ? (
        <span className="pulse-animation">🎤</span>
      ) : (
        <span>🎤</span>
      )}
    </button>
  );
};

export default VoiceButton;