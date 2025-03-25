import { useState, useEffect } from 'react';
import { saveMessage, getMessages } from '../services/firebase';
import { getAIResponse } from '../services/groq';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [lastSpokenId, setLastSpokenId] = useState(null);

  useEffect(() => {
    // Load chat history from Firebase
    const unsubscribe = getMessages((loadedMessages) => {
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    await saveMessage(userMessage);
    setInput('');

    // Prepare messages for OpenAI (last 10 messages for context)
    const recentMessages = [...messages, userMessage]
      .slice(-10)
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

    // Get AI response
    const aiText = await getAIResponse(recentMessages);
    
    // Add AI response to chat
    const aiMessage = {
      text: aiText,
      sender: 'ai',
      timestamp: new Date().toISOString(),
      isNew: true
    };
    await saveMessage(aiMessage);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Try Chrome or Edge.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speak = (text, id) => {
    if (id && id === lastSpokenId) return; // Skip if already spoken
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    setLastSpokenId(id); // Mark as spoken
  };
  
  return {
    messages,
    setMessages,
    input,
    setInput,
    handleSubmit,
    handleVoiceInput,
    isListening,
    speak
  };
};
