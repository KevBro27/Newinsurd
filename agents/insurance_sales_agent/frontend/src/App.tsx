import React, { useState, useEffect, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// --- Helper Components ---

const ChatBubble = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-5 right-5 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-transform transform hover:scale-110"
    aria-label="Open chat"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  </button>
);

const LeadCaptureForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email, phone });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <p className="text-sm text-gray-700 mb-2">I can have an agent reach out. Please provide your details below.</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-md" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-md" required />
        <input type="tel" placeholder="Phone (Optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded-md" />
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I can help you learn about life insurance and get an instant quote. What questions do you have?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue, history: messages }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      // Check if the response triggers the lead form
      if (data.content.includes("What is your name, email, and phone number?")) {
        setShowLeadForm(true);
      }

      setMessages(prev => [...prev, data]);

    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I seem to be having trouble connecting. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (leadData) => {
    setIsLoading(true);
    try {
      await fetch(`${API_BASE_URL}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      setMessages(prev => [...prev, { role: 'assistant', content: "Thank you! An agent will be in touch with you soon." }]);
    } catch (error) {
      console.error("Failed to submit lead:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error submitting your information. Please try again later.' }]);
    } finally {
        setShowLeadForm(false);
        setIsLoading(false);
    }
  };


  return (
    <>
      {!isOpen && <ChatBubble onClick={() => setIsOpen(true)} />}

      {isOpen && (
        <div className="fixed bottom-5 right-5 w-full max-w-sm h-full max-h-[70vh] bg-white rounded-lg shadow-2xl flex flex-col font-sans">
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center rounded-t-lg">
            <h2 className="font-bold text-lg">Insurance Agent</h2>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200" aria-label="Close chat">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                    {msg.apply_url && (
                       <button onClick={() => window.open(msg.apply_url, '_blank')} className="mt-2 bg-white text-blue-600 font-bold py-1 px-3 rounded-lg w-full text-center hover:bg-gray-100">
                         Apply Now
                       </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && !showLeadForm && (
                <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl shadow animate-pulse">...</div>
                </div>
              )}
              {showLeadForm && <LeadCaptureForm onSubmit={handleLeadSubmit} />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || showLeadForm}
              />
              <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading || showLeadForm}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
