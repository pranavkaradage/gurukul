import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { publicApi } from "../../services/api";

const Chatbot = () => {
  const { colors, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [websiteData, setWebsiteData] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you learn more about Gurukul. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [expandedMessages, setExpandedMessages] = useState(new Set());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const MAX_MESSAGE_LENGTH = 200; // Characters before showing "read more"

  // Contact information
  const contactInfo = {
    email: "info@gurukulschools.org",
    whatsapp: "+91 8793505266",
  };

  // Fetch website data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicApi.getAllData();
        setWebsiteData(response.data);
      } catch (error) {
        console.error("Error fetching website data for chatbot:", error);
      }
    };
    fetchData();
  }, []);

  // Generate dynamic suggested questions based on API data
  const generateSuggestedQuestions = () => {
    const suggestions = [];
    
    if (websiteData) {
      // About questions
      if (websiteData.about?.shortInfo || websiteData.about?.vision || websiteData.about?.mission) {
        suggestions.push("Tell me about Gurukul");
        suggestions.push("What is your vision?");
        suggestions.push("What is your mission?");
      }
      
      // Units questions
      if (websiteData.units && websiteData.units.length > 0) {
        suggestions.push("What units do you have?");
        if (websiteData.units.length > 0) {
          const firstUnit = websiteData.units[0];
          if (firstUnit.name) {
            suggestions.push(`Tell me about ${firstUnit.name}`);
          }
        }
      }
      
      // Admission questions
      suggestions.push("How do I apply for admission?");
      suggestions.push("What are the admission requirements?");
      
      // Contact questions
      suggestions.push("How can I contact you?");
    } else {
      // Default suggestions if data not loaded
      suggestions.push("Tell me about Gurukul");
      suggestions.push("What units do you have?");
      suggestions.push("How do I apply for admission?");
      suggestions.push("How can I contact you?");
    }
    
    return suggestions.slice(0, 4); // Limit to 4 suggestions
  };

  // Dynamic knowledge base based on API data
  const getKnowledgeBase = () => {
    const units = websiteData?.units || [];
    const about = websiteData?.about || {};
    const contact = websiteData?.contact || contactInfo;
    
    return {
      greeting: [
        "Hello! Welcome to Gurukul. How can I help you today?",
        "Hi there! I'm here to assist you with information about Gurukul.",
        "Greetings! What would you like to know about our institution?",
      ],
      admission: [
        "For admissions, you can visit our Admissions section on the website or contact us directly. We offer various programs and courses to suit your educational needs.",
        "Admissions are open for multiple programs. Please check our website's Admissions section for detailed admission procedures, requirements, and important dates.",
        "To learn more about admissions, please visit the Admissions section on our website or contact our admission office directly.",
      ],
      contact: [
        `You can contact us via:\n📧 Email: ${contact.email || contactInfo.email}\n📱 WhatsApp: ${contact.whatsapp || contactInfo.whatsapp}\n\nFeel free to reach out with any questions!`,
        `For any queries, please contact us:\n\nEmail: ${contact.email || contactInfo.email}\nWhatsApp: ${contact.whatsapp || contactInfo.whatsapp}\n\nWe're here to help!`,
        `Get in touch with us:\n\n📧 Email: ${contact.email || contactInfo.email}\n📱 WhatsApp: ${contact.whatsapp || contactInfo.whatsapp}\n\nVisit our Contact section for more details.`,
      ],
      about: about.shortInfo 
        ? [
            `${about.shortInfo}${about.vision ? `\n\nOur Vision: ${about.vision}` : ""}${about.mission ? `\n\nOur Mission: ${about.mission}` : ""}`,
            `Gurukul is committed to excellence in education.${about.vision ? ` Our vision is: ${about.vision}` : ""}${about.mission ? ` Our mission: ${about.mission}` : ""}`,
            `We focus on holistic education.${about.shortInfo ? ` ${about.shortInfo}` : ""}`,
          ]
        : [
            "Gurukul is an educational institution dedicated to providing quality education. You can learn more in our About Us section.",
            "We are committed to excellence in education. Visit our About Us page to learn more about our vision, mission, and values.",
            "Gurukul focuses on holistic education. Check out our About section for detailed information about our institution.",
          ],
      units: units.length > 0
        ? [
            `We have ${units.length} academic unit${units.length > 1 ? "s" : ""}: ${units.map(u => u.name || "Unit").join(", ")}. You can explore each unit in the 'Our Units' section on our website.`,
            `Gurukul consists of ${units.length} academic unit${units.length > 1 ? "s" : ""}, each offering specialized programs. ${units.length > 0 ? `Our units include: ${units.slice(0, 3).map(u => u.name || "Unit").join(", ")}${units.length > 3 ? " and more" : ""}.` : ""} Visit the Units section to learn more.`,
            `Our institution has ${units.length} academic unit${units.length > 1 ? "s" : ""}. ${units.length > 0 ? `Some of our units are: ${units.slice(0, 2).map(u => u.name || "Unit").join(" and ")}.` : ""} Check the 'Our Units' section for detailed information about each unit.`,
          ]
        : [
            "We have multiple academic units. You can explore them in the 'Our Units' section on our website.",
            "Gurukul consists of several academic units, each offering specialized programs. Visit the Units section to learn more.",
            "Our institution has various academic units. Check the 'Our Units' section for detailed information about each unit.",
          ],
      default: [
        "I'm here to help! Could you please provide more details about what you're looking for? For specific queries, you can contact us directly.",
        "That's an interesting question. Let me help you find the right information. Could you be more specific? Or feel free to contact us for detailed assistance.",
        `I'd be happy to assist you. Can you tell me more about what you need? For immediate help, contact us at ${contact.email || contactInfo.email} or WhatsApp: ${contact.whatsapp || contactInfo.whatsapp}`,
      ],
    };
  };

  // Function to find the best response based on user input
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    const knowledgeBase = getKnowledgeBase();
    const units = websiteData?.units || [];
    const contact = websiteData?.contact || contactInfo;

    // Check for greetings
    if (
      message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i)
    ) {
      return knowledgeBase.greeting[
        Math.floor(Math.random() * knowledgeBase.greeting.length)
      ];
    }

    // Check for specific unit queries
    if (units.length > 0) {
      for (const unit of units) {
        const unitName = (unit.name || "").toLowerCase();
        if (unitName && message.includes(unitName)) {
          return `Yes! ${unit.name} is one of our academic units. ${unit.description || `You can learn more about ${unit.name} by visiting the unit's page on our website.`} Would you like to know more about admissions or other units?`;
        }
      }
    }

    // Check for admission-related queries
    if (
      message.match(
        /(admission|admit|enroll|enrollment|apply|application|course|program|fee|fees|how to join|how to apply)/i
      )
    ) {
      return knowledgeBase.admission[
        Math.floor(Math.random() * knowledgeBase.admission.length)
      ];
    }

    // Check for contact-related queries
    if (
      message.match(
        /(contact|email|phone|whatsapp|address|location|reach|get in touch|call|message)/i
      )
    ) {
      return knowledgeBase.contact[
        Math.floor(Math.random() * knowledgeBase.contact.length)
      ];
    }

    // Check for about-related queries
    if (
      message.match(
        /(about|who|what|institution|school|college|gurukul|vision|mission|history|tell me about)/i
      )
    ) {
      return knowledgeBase.about[
        Math.floor(Math.random() * knowledgeBase.about.length)
      ];
    }

    // Check for units-related queries
    if (message.match(/(unit|units|branch|branches|department|departments|what units|which units)/i)) {
      return knowledgeBase.units[
        Math.floor(Math.random() * knowledgeBase.units.length)
      ];
    }

    // Check for results/achievements
    if (message.match(/(result|results|achievement|achievements|performance|rank|ranking)/i)) {
      return "You can find our results and achievements in the Results section on our website. We're proud of our students' accomplishments!";
    }

    // Check for events
    if (message.match(/(event|events|activity|activities|upcoming|schedule)/i)) {
      return "We regularly organize various events and activities. Check out the Events section on our website to see upcoming events and past activities.";
    }

    // Check for circulars/notices
    if (message.match(/(circular|circulars|notice|notices|announcement|announcements)/i)) {
      return "Important circulars and notices are posted in the Circulars section on our website. Make sure to check regularly for updates.";
    }

    // Default response with contact info
    return `${knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)]}\n\nFor immediate assistance, contact us:\n📧 ${contact.email || contactInfo.email}\n📱 ${contact.whatsapp || contactInfo.whatsapp}`;
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat opens and reset suggestions
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
      // Reset suggestions when opening chat (only if it's the initial message)
      if (messages.length === 1) {
        setShowSuggestions(true);
      }
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleSuggestionClick = (suggestion) => {
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: suggestion,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Get bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(suggestion),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleDeleteChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm here to help you learn more about Gurukul. How can I assist you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setShowSuggestions(true);
      setExpandedMessages(new Set());
    }
  };

  const toggleMessageExpand = (messageId) => {
    setExpandedMessages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const shouldTruncate = (text) => {
    return text.length > MAX_MESSAGE_LENGTH;
  };

  const getTruncatedText = (text) => {
    if (text.length <= MAX_MESSAGE_LENGTH) return text;
    return text.substring(0, MAX_MESSAGE_LENGTH) + "...";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <>
      <style>{`
        .chatbot-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          font-family: 'Poppins', sans-serif;
        }

        .chatbot-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .chatbot-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
        }

        .chatbot-button:active {
          transform: scale(0.95);
        }

        .chatbot-icon {
          width: 28px;
          height: 28px;
          color: white;
          transition: transform 0.3s ease;
        }

        .chatbot-button:hover .chatbot-icon {
          transform: rotate(15deg);
        }

        .chatbot-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 20px;
          height: 20px;
          background: #ef4444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: white;
          font-weight: bold;
          border: 2px solid ${colors.card};
        }

        .chatbot-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          height: 500px;
          max-height: 80vh;
          background: ${colors.card};
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          animation: chatSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          border: 1px solid ${colors.border};
        }

        @keyframes chatSlideUp {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chatbot-header {
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
          color: white;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .chatbot-header-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .chatbot-header-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chatbot-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .chatbot-header-text h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .chatbot-header-text p {
          margin: 0;
          font-size: 0.75rem;
          opacity: 0.9;
        }

        .chatbot-close,
        .chatbot-delete {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .chatbot-close:hover,
        .chatbot-delete:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .chatbot-delete {
          font-size: 1rem;
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          background: ${colors.backgroundAlt};
          min-height: 0;
        }

        .chatbot-messages-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.textSecondary};
          font-size: 0.9rem;
          text-align: center;
          padding: 2rem;
        }

        .suggested-questions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .suggested-questions-label {
          font-size: 0.75rem;
          color: ${colors.textSecondary};
          margin-bottom: 0.5rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .suggested-question {
          padding: 0.65rem 1rem;
          background: ${colors.card};
          border: 1px solid ${colors.border};
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.85rem;
          color: ${colors.text};
          transition: all 0.2s ease;
          text-align: left;
          font-weight: 400;
          position: relative;
          overflow: hidden;
        }

        .suggested-question::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: ${colors.primary};
          transform: scaleY(0);
          transition: transform 0.2s ease;
        }

        .suggested-question:hover {
          background: ${colors.primary}10;
          border-color: ${colors.primary};
          transform: translateX(4px);
          box-shadow: 0 2px 8px ${colors.primary}20;
        }

        .suggested-question:hover::before {
          transform: scaleY(1);
        }

        .suggested-question:active {
          transform: translateX(2px);
        }

        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
          background: ${colors.border};
          border-radius: 3px;
        }

        .message {
          display: flex;
          gap: 0.75rem;
          animation: messageSlideIn 0.3s ease;
        }

        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .message.user .message-avatar {
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
          color: white;
        }

        .message.bot .message-avatar {
          background: ${colors.border};
          color: ${colors.text};
        }

        .message-content {
          max-width: 75%;
          padding: 0.75rem 1rem;
          border-radius: 18px;
          word-wrap: break-word;
          word-break: break-word;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .message-text {
          white-space: pre-line;
        }

        .read-more-btn {
          margin-top: 0.5rem;
          padding: 0.25rem 0.75rem;
          background: transparent;
          border: 1px solid currentColor;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.2s ease;
          opacity: 0.8;
        }

        .read-more-btn:hover {
          opacity: 1;
          transform: scale(1.05);
        }

        .message.user .read-more-btn {
          color: white;
          border-color: rgba(255, 255, 255, 0.5);
        }

        .message.bot .read-more-btn {
          color: ${colors.primary};
          border-color: ${colors.primary};
        }

        .message.user .message-content {
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.bot .message-content {
          background: ${colors.card};
          color: ${colors.text};
          border: 1px solid ${colors.border};
          border-bottom-left-radius: 4px;
        }

        .message-time {
          font-size: 0.7rem;
          opacity: 0.6;
          margin-top: 0.25rem;
          text-align: right;
        }

        .message.user .message-time {
          text-align: left;
        }

        .typing-indicator {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: ${colors.card};
          border: 1px solid ${colors.border};
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          max-width: 75px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${colors.textSecondary};
          animation: typingBounce 1.4s infinite;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typingBounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .chatbot-input-container {
          padding: 1rem 1.25rem;
          background: ${colors.card};
          border-top: 1px solid ${colors.border};
          flex-shrink: 0;
        }

        .chatbot-input-form {
          display: flex;
          gap: 0.75rem;
          align-items: flex-end;
        }

        .chatbot-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid ${colors.border};
          border-radius: 24px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          background: ${colors.backgroundAlt};
          color: ${colors.text};
          resize: none;
          max-height: 120px;
          min-height: 44px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .chatbot-input:focus {
          border-color: ${colors.primary};
        }

        .chatbot-send {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .chatbot-send:hover {
          transform: scale(1.1);
        }

        .chatbot-send:active {
          transform: scale(0.95);
        }

        .chatbot-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .chatbot-container {
            bottom: 20px;
            right: 20px;
          }

          .chatbot-window {
            width: calc(100vw - 40px);
            height: 500px;
            max-height: 80vh;
            max-width: 450px;
            bottom: 80px;
            right: 0;
          }

          .chatbot-button {
            width: 56px;
            height: 56px;
          }

          .chatbot-header {
            padding: 0.875rem 1rem;
          }

          .chatbot-messages {
            padding: 0.875rem 1rem;
          }

          .chatbot-input-container {
            padding: 0.875rem 1rem;
          }

          .message-content {
            max-width: 80%;
            font-size: 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .chatbot-container {
            bottom: 15px;
            right: 15px;
          }

          .chatbot-window {
            width: calc(100vw - 30px);
            height: calc(100vh - 100px);
            max-height: 85vh;
            border-radius: 16px;
            bottom: 70px;
          }

          .chatbot-button {
            width: 52px;
            height: 52px;
          }

          .chatbot-icon {
            width: 24px;
            height: 24px;
          }

          .chatbot-header {
            padding: 0.75rem 1rem;
          }

          .chatbot-header-text h3 {
            font-size: 0.9rem;
          }

          .chatbot-header-text p {
            font-size: 0.7rem;
          }

          .chatbot-avatar {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }

          .chatbot-messages {
            padding: 0.75rem 1rem;
            gap: 0.75rem;
          }

          .message-content {
            max-width: 85%;
            padding: 0.65rem 0.875rem;
            font-size: 0.85rem;
          }

          .message-avatar {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
          }

          .chatbot-input-container {
            padding: 0.75rem 1rem;
          }

          .chatbot-input {
            font-size: 0.85rem;
            padding: 0.65rem 0.875rem;
          }

          .chatbot-send {
            width: 40px;
            height: 40px;
          }

          .suggested-question {
            padding: 0.55rem 0.875rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 360px) {
          .chatbot-window {
            width: calc(100vw - 20px);
            height: calc(100vh - 80px);
            bottom: 60px;
          }

          .chatbot-button {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>

      <div className="chatbot-container">
        {isOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">G</div>
                <div className="chatbot-header-text">
                  <h3>Gurukul Assistant</h3>
                  <p>Online • Ready to help</p>
                </div>
              </div>
              <div className="chatbot-header-actions">
                {messages.length > 1 && (
                  <button
                    className="chatbot-delete"
                    onClick={handleDeleteChat}
                    aria-label="Clear chat"
                    title="Clear chat history"
                  >
                    🗑️
                  </button>
                )}
                <button
                  className="chatbot-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.length === 0 ? (
                <div className="chatbot-messages-empty">
                  No messages yet. Start a conversation!
                </div>
              ) : (
                <>
                  {messages.map((message) => {
                    const isExpanded = expandedMessages.has(message.id);
                    const needsTruncation = shouldTruncate(message.text);
                    const displayText = needsTruncation && !isExpanded
                      ? getTruncatedText(message.text)
                      : message.text;

                    return (
                      <div
                        key={message.id}
                        className={`message ${message.sender}`}
                      >
                        <div className="message-avatar">
                          {message.sender === "user" ? "You" : "G"}
                        </div>
                        <div>
                          <div className="message-content">
                            <div className="message-text">{displayText}</div>
                            {needsTruncation && (
                              <button
                                className="read-more-btn"
                                onClick={() => toggleMessageExpand(message.id)}
                                type="button"
                              >
                                {isExpanded ? "Read less" : "Read more"}
                              </button>
                            )}
                          </div>
                          <div className="message-time">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {showSuggestions && (
                    <div className="suggested-questions">
                      <div className="suggested-questions-label">
                        Suggested questions:
                      </div>
                      {generateSuggestedQuestions().map((suggestion, idx) => (
                        <button
                          key={idx}
                          className="suggested-question"
                          onClick={() => handleSuggestionClick(suggestion)}
                          type="button"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  {isTyping && (
                    <div className="message bot">
                      <div className="message-avatar">G</div>
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input-container">
              <form className="chatbot-input-form" onSubmit={handleSendMessage}>
                <textarea
                  ref={inputRef}
                  className="chatbot-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className="chatbot-send"
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}

        <button
          className="chatbot-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          <svg
            className="chatbot-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </>
            )}
          </svg>
        </button>
      </div>
    </>
  );
};

export default Chatbot;

