'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaRegSmile, FaMicrophone, FaImage } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hello! 👋 I am Rakibul Hasan's AI assistant, built with Retrieval Augmented Generation and developed by Google. I'm here to help you learn more about Rakibul's skills, projects, and experiences. I have access to his portfolio data and can provide detailed information about his work. Feel free to ask me anything about his:\n\n• Programming skills 💻\n• Projects and contributions 🚀\n• Educational background 📚\n• Professional experience 💼\n• Technical expertise 🔧\n\nHow can I assist you today?",
  timestamp: new Date()
};

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_KEY = 'AIzaSyBpsHHx4SY6RT1EWvdTXJwevJA5cxT9_es';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([INITIAL_MESSAGE]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsSpeechEnabled(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsSpeechEnabled(false);
      };

      recognition.onerror = () => {
        setIsSpeechEnabled(false);
      };

      recognition.onend = () => {
        setIsSpeechEnabled(false);
      };

      recognition.start();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsTyping(true);

    try {
      // Simulate AI response with RAG context
      setTimeout(() => {
        const aiResponse = {
          role: 'assistant' as const,
          content: `As Rakibul's AI assistant, I can tell you that ${generateContextualResponse(userMessage)}`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error in chat:', error);
      setIsTyping(false);
    }
  };

  const generateContextualResponse = (message: string) => {
    // Simple response generation based on keywords
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('skills') || lowerMessage.includes('programming')) {
      return "Rakibul is proficient in C++, Python, JavaScript, and web development technologies. He's particularly skilled in competitive programming and problem-solving.";
    }
    if (lowerMessage.includes('education') || lowerMessage.includes('study')) {
      return "Rakibul is pursuing his Bachelor's in Computer Science and Engineering at Daffodil International University.";
    }
    if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return "Rakibul has worked on various projects including web applications, programming tools, and educational platforms. Would you like to know about a specific project?";
    }
    return "I'd be happy to help you learn more about Rakibul's experience and skills. Could you please be more specific about what you'd like to know?";
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-4 right-4 bg-[#64FFDA] text-[#0A192F] p-4 rounded-full shadow-lg hover:shadow-xl z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <FaRobot className="w-6 h-6 transform group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-20 right-4 w-96 max-w-[calc(100vw-2rem)] bg-[#112240] rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#0A192F] border-b border-[#64FFDA]/20">
              <div className="flex items-center space-x-2">
                <FaRobot className="w-6 h-6 text-[#64FFDA]" />
                <h3 className="text-[#64FFDA] font-bold">Rakibul's AI Assistant</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#64FFDA]/20 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col space-y-1">
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[#64FFDA] text-[#0A192F] rounded-br-none'
                          : 'bg-[#0A192F] text-[#CCD6F6] rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                    <span className={`text-xs text-[#8892B0] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#0A192F] text-[#CCD6F6] p-3 rounded-lg rounded-bl-none">
                    <motion.div
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        transition: { duration: 1.5, repeat: Infinity }
                      }}
                    >
                      Typing...
                    </motion.div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#0A192F] border-t border-[#64FFDA]/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#64FFDA] p-2 rounded-full hover:bg-[#64FFDA]/10"
                >
                  <FaRegSmile className="w-5 h-5" />
                </motion.button>
                
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#112240] text-[#CCD6F6] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64FFDA] placeholder-[#8892B0]"
                />

                <motion.button
                  type="button"
                  onClick={startSpeechRecognition}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full ${
                    isSpeechEnabled 
                      ? 'bg-[#64FFDA] text-[#0A192F]' 
                      : 'text-[#64FFDA] hover:bg-[#64FFDA]/10'
                  }`}
                >
                  <FaMicrophone className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#64FFDA] text-[#0A192F] p-2 rounded-lg hover:bg-[#64FFDA]/90"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatPopup; 