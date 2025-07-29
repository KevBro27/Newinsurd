import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { knowledgeBase } from '../data/knowledgeBase';

// --- Icon Components ---
const ChatIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

// --- Types ---
interface Message {
    sender: 'user' | 'bot';
    text: string;
}

// --- Chatbot Component ---
const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const systemInstruction = `Identity: You are the KBJ Strategic Advisor, the AI assistant for Kevin Brown Jr. Insurance. Personality: Your brand voice is "Strategic Disruptor." You must be confident, authoritative, intelligent, and helpful. You are direct and get straight to the point. You are not a generic, bubbly customer service bot. Mission: Your goal is to answer questions accurately using website content and guide users to the correct tool. Rule for Unknowns: If you cannot find an answer in the website content, you MUST respond with: "That's a specific question that's best answered by Kevin directly. You can find his contact information or schedule a call on our contact page. [link to /contact|Click here to contact us.]" You must not invent answers. Your answers must be based *only* on the knowledge base provided. Knowledge Base (Your ONLY source of truth): ${knowledgeBase}`;
    
    useEffect(() => {
        if (isOpen && !chatRef.current) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                });
                setMessages([{ sender: 'bot', text: "KBJ Strategic Advisor. I have direct access to our analytics and tools. How can I help you gain an advantage today?" }]);
            } catch (error) {
                console.error("Failed to initialize chatbot:", error);
                setMessages([{ sender: 'bot', text: "Apologies, the advisor is currently unavailable. Please try again later." }]);
            }
        }
        if (!isOpen) {
            // Reset state on close
            setShowInput(false);
            setMessages([]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        setMessages(prev => [...prev, { sender: 'user', text }]);
        setIsLoading(true);

        try {
            if (!chatRef.current) throw new Error("Chat not initialized.");
            const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: text });
            setMessages(prev => [...prev, { sender: 'bot', text: response.text }]);
        } catch (error) {
            console.error("Gemini API error:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "I encountered an issue. Please try rephrasing your question or visit our contact page." }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleStarterClick = (userText: string, botText: string) => {
        setMessages(prev => [...prev, { sender: 'user', text: userText }, { sender: 'bot', text: botText }]);
        setShowInput(true);
    };

    const renderMessageContent = (text: string) => {
        const linkRegex = /\[link to (.*?)\|(.*?)\]/g;
        const parts = text.split(linkRegex);
      
        return (
            <p>
            {parts.map((part, index) => {
                if (index % 3 === 1) { // Path
                const path = part;
                const linkText = parts[index + 1];
                return <Link key={index} to={path} className="text-brand-gold font-bold underline hover:text-brand-gold-dark" onClick={() => setIsOpen(false)}>{linkText}</Link>;
                }
                if (index % 3 === 2) { // Link text, already used
                return null;
                }
                return part;
            }).filter(Boolean)}
            </p>
        );
    };

    return (
        <>
            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-5 right-5 h-16 w-16 bg-brand-gold text-brand-navy rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 z-[9998] hover:scale-110 hover:bg-brand-gold-dark ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                aria-label="Open Chat"
            >
                <ChatIcon />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-5 right-5 w-[calc(100%-2.5rem)] max-w-sm h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col origin-bottom-right transform transition-all duration-300 z-[9999] ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
                {/* Header */}
                <header className="bg-brand-navy text-white p-4 flex justify-between items-center rounded-t-2xl">
                    <h3 className="font-bold text-lg">KBJ Strategic Advisor</h3>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:text-brand-gold" aria-label="Close chat">
                        <CloseIcon />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user' ? 'bg-brand-navy text-white rounded-br-none' : 'bg-gray-200 text-brand-body-text rounded-bl-none'}`}>
                                    {renderMessageContent(msg.text)}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-200 text-brand-body-text rounded-bl-none animate-pulse">
                                    <div className="flex space-x-1">
                                      <div className="w-2 h-2 bg-brand-body-text/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                      <div className="w-2 h-2 bg-brand-body-text/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                      <div className="w-2 h-2 bg-brand-body-text/50 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                    {!showInput && messages.length === 1 && (
                        <div className="space-y-2">
                             <button onClick={() => handleStarterClick("I need a new policy.", "Understood. Our Quote & Apply tool gives you a full, transparent view of the market. [link to /quote-and-apply|You can access it here.]")} className="w-full text-left p-3 bg-white border border-brand-navy text-brand-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors">I need a new policy.</button>
                             <button onClick={() => handleStarterClick("I want to review my current policy.", "Excellent. A strategic audit is the best way to find hidden savings and gaps. [link to /free-audit|You can start the free, confidential process here.]")} className="w-full text-left p-3 bg-white border border-brand-navy text-brand-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors">I want to review my current policy.</button>
                             <button onClick={() => { setMessages(prev => [...prev, { sender: 'user', text: 'I have a general question.' }, { sender: 'bot', text: 'Ask away. I will pull the answer from our Legacy Playbook.' }]); setShowInput(true); }} className="w-full text-left p-3 bg-white border border-brand-navy text-brand-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors">I have a general question.</button>
                        </div>
                    )}
                    {showInput && (
                        <form onSubmit={(e) => { e.preventDefault(); const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement; handleSendMessage(input.value); input.value = ''; }} className="flex items-center space-x-2">
                            <input
                                name="message"
                                type="text"
                                placeholder="Ask a question..."
                                className="flex-1 w-full bg-white border border-gray-300 rounded-lg p-3 text-brand-navy focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition"
                                disabled={isLoading}
                                autoComplete="off"
                            />
                            <button type="submit" disabled={isLoading} className="p-3 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/80 disabled:bg-gray-400">
                                <SendIcon />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default Chatbot;
