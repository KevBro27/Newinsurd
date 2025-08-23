import React, { useState, useRef, useEffect } from 'react';

// Icons
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


const Chatbot: React.FC<{ className?: string }> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const chatboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to bottom of chatbox on new message
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }

        // Send welcome message on first open
        if (isOpen && messages.length === 0 && !isLoading) {
            setIsLoading(true);
            setTimeout(() => { // a small delay to feel more natural
                setMessages([{
                    role: 'assistant',
                    content: "Welcome! I'm the Strategic Advisor for Kevin Brown Jr. Insurance. How can I help you today? You can ask about quotes, policy audits, or our solutions."
                }]);
                setIsLoading(false);
            }, 500);
        }
    }, [messages, isOpen, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const userMessageContent = userInput;
        const currentMessages = [...messages, { role: 'user' as const, content: userMessageContent }];

        setMessages(currentMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/.netlify/functions/strategic-advisor', {
                method: 'POST',
                body: JSON.stringify({
                    history: messages,
                    user: userMessageContent,
                }),
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Network error: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            const botReply = data.reply || "Sorry, I'm having trouble connecting. Please try again later.";

            setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
        } catch (error) {
            console.error('Error fetching chat response:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, something went wrong. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* Chat Bubble */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-brand-gold p-4 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300"
                aria-label="Toggle Chat"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-full right-0 w-80 md:w-96 h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col mb-4">
                    {/* Header */}
                    <div className="bg-brand-navy text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-bold text-lg">Strategic Advisor</h3>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300">
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={chatboxRef} className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`my-2 p-3 rounded-lg max-w-[85%] ${
                                msg.role === 'user'
                                ? 'bg-brand-gold text-brand-navy ml-auto'
                                : 'bg-gray-200 text-brand-body-text mr-auto'
                            }`}>
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && (
                             <div className="my-2 p-3 rounded-lg max-w-[85%] bg-gray-200 text-brand-body-text mr-auto">
                                ...
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                        <form onSubmit={handleSendMessage} className="flex items-center">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                disabled={isLoading}
                            />
                            <button type="submit" className="ml-3 text-brand-gold hover:text-brand-gold-dark disabled:opacity-50" disabled={isLoading}>
                                <SendIcon />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
