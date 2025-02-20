'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaRegSmile, FaMicrophone } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Portfolio information for the AI
const PORTFOLIO_INFO = {
  skills: {
    languages: ['C++', 'Python', 'JavaScript', 'TypeScript'],
    frontend: ['React.js', 'Next.js', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'Django'],
    databases: ['MongoDB', 'MySQL'],
    tools: ['Git', 'Docker', 'VS Code']
  },
  projects: [
    {
      name: 'Portfolio Website',
      tech: 'Next.js, Tailwind CSS',
      description: 'Modern personal portfolio with AI chat integration'
    },
    {
      name: 'Meal Explorer',
      tech: 'React.js',
      description: 'Web app for exploring recipes'
    },
    {
      name: 'Nature Platter',
      tech: 'HTML, Tailwind CSS',
      description: 'Responsive website with modern design'
    },
    {
      name: 'Word Cloud Generator',
      tech: 'Python, Django',
      description: 'Text analysis and visualization tool'
    }
  ],
  education: {
    degree: 'BSc in Computer Science and Engineering',
    institution: 'Daffodil International University',
    period: '2023-2026',
    achievements: ['Active in programming contests', 'Strong academic performance']
  },
  competitiveProgramming: {
    platforms: ['Codeforces', 'AtCoder', 'LeetCode', 'Toph', 'Beecrowd'],
    achievements: ['500+ problems solved', 'Regular contest participant']
  }
};

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! 👋 Ask me about:\n\n• Programming & Technical Skills 💻\n• Projects & Development Work 🚀\n• Education & Achievements 📚\n• Competitive Programming 🏆\n\nHow can I help you learn more?",
  timestamp: new Date()
};

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([INITIAL_MESSAGE]);
    }
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Speech recognition setup
  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsSpeechEnabled(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsSpeechEnabled(false);
    };
    recognition.onerror = () => {
      setIsSpeechEnabled(false);
      setError('Failed to recognize speech. Please try again.');
    };
    recognition.onend = () => setIsSpeechEnabled(false);

    recognition.start();
  };

  // Generate AI response using Gemini
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const prompt = {
        contents: [{
          parts: [{
            text: `You are a helpful assistant for a portfolio website. Use this information about Rakibul:
            ${JSON.stringify(PORTFOLIO_INFO, null, 2)}
            
            Previous conversation:
            ${messages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')}
            
            User question: ${userMessage}
            
            Respond in a natural, helpful way. Use bullet points for lists. Keep responses concise and informative.
            Don't mention that you're an AI. Focus on providing accurate information about Rakibul.`
          }]
        }]
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prompt)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error('Failed to generate response. Please try again.');
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setError(null);
    
    // Add user message
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage, 
      timestamp: new Date() 
    }]);
    
    setIsTyping(true);

    try {
      const response = await generateResponse(userMessage);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-4 right-4 bg-[#64FFDA] text-[#0A192F] p-4 rounded-full shadow-lg hover:shadow-xl z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
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
                <h3 className="text-[#64FFDA] font-bold">Portfolio Chat</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                aria-label="Close chat"
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
                  <div className="flex flex-col space-y-1 max-w-[80%]">
                    <div
                      className={`p-3 rounded-lg ${
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
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-center text-sm p-2"
                >
                  {error}
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
                  onClick={startSpeechRecognition}
                  disabled={isSpeechEnabled}
                  className={`p-2 rounded-full ${
                    isSpeechEnabled 
                      ? 'bg-[#64FFDA] text-[#0A192F]' 
                      : 'text-[#64FFDA] hover:bg-[#64FFDA]/10'
                  }`}
                  aria-label="Start voice input"
                >
                  <FaMicrophone className="w-5 h-5" />
                </motion.button>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#112240] text-[#CCD6F6] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64FFDA] placeholder-[#8892B0]"
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#64FFDA] text-[#0A192F] p-2 rounded-lg hover:bg-[#64FFDA]/90"
                  aria-label="Send message"
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