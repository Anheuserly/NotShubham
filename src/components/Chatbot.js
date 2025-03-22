import React, { useState, useEffect } from "react";
import { MessageCircle, X, Paperclip, Mic, Volume2 } from "lucide-react";
import "../styles/Chatbot.css";

// Simulate an AI response (this could be extended with actual AI integration)
const getBotResponse = (userMessage, language) => {
  // Basic response logic with multi-language support
  if (language === 'en') {
    if (userMessage.includes("hello")) return "Hi! How can I assist you today?";
    if (userMessage.includes("help")) return "What do you need help with? Feel free to ask!";
    return "I'm sorry, I didn't understand that. Could you try again?";
  } else if (language === 'es') {
    if (userMessage.includes("hola")) return "¡Hola! ¿Cómo puedo ayudarte hoy?";
    if (userMessage.includes("ayuda")) return "¿Con qué necesitas ayuda? ¡No dudes en preguntar!";
    return "Lo siento, no entendí eso. ¿Podrías intentarlo de nuevo?";
  }
  return "Sorry, I don't support this language yet.";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! How can I assist you today?" }]);
  const [userInput, setUserInput] = useState("");
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Basic push notification (this can be extended with a more complex system)
      setNotification(true);
      setTimeout(() => setNotification(false), 2000);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Add user message to chat
      setMessages([...messages, { sender: "user", text: userInput }]);

      // Get bot response
      const botResponse = getBotResponse(userInput, language);

      // Add bot response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    }
    setUserInput(""); // Clear input field
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleVoiceInput = () => {
    setIsVoiceInput(!isVoiceInput);
    // Voice input integration (placeholder for actual voice recognition system)
  };

  const handleChangeLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en'); // Toggle between English and Spanish
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Chat with us</h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`message ${message.sender === "bot" ? "bot-message" : "user-message"}`}
              >
                {message.text}
              </p>
            ))}
            {file && (
              <div className="file-preview">
                <span>{file.name}</span>
                <button onClick={() => setFile(null)}>Remove</button>
              </div>
            )}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="chatbot-input"
            />
            <div className="chatbot-actions">
              <input
                type="file"
                accept="image/*, .pdf, .docx"
                onChange={handleFileUpload}
                className="file-input"
              />
              <button onClick={handleVoiceInput} className="voice-button">
                <Mic size={24} />
              </button>
              <button onClick={handleChangeLanguage} className="language-toggle">
                {language === 'en' ? 'Español' : 'English'}
              </button>
              <button onClick={handleSendMessage} className="send-button">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && <div className="push-notification">You have a new message!</div>}
    </div>
  );
};

export default Chatbot;
