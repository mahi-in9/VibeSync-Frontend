import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { TbMessageChatbot } from 'react-icons/tb';
import { X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { geminiApi } from "../apis/api"

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const generateResponse = async (msg) => {
        if (!msg.trim()) return;
        setTyping(true);

        try {
            if (msg.toLowerCase().includes("what is api")) {
                const answer = `API stands for Application Programming Interface. It's a way for apps to talk to each other and share data.`;
                setMessages(prev => [
                    ...prev,
                    { type: "user", text: msg },
                    { type: "bot", text: answer },
                ]);
                setMessage("");
                return;
            }

            const ai = new GoogleGenAI({ apiKey: `${geminiApi}` });
            const result = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: msg
            });

            setMessages(prev => [
                ...prev,
                { type: "user", text: msg },
                { type: "bot", text: result.text || "Sorry, no response." },
            ]);

            setMessage("");
        } catch (err) {
            console.error(err);
            setMessages(prev => [
                ...prev,
                { type: "bot", text: "Error: Could not fetch response." },
            ]);
        } finally {
            setTyping(false);
        }
    };

    return (
        <>
            {!isChatOpen && (
                <div
                    className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center shadow-lg cursor-pointer animate-bounce z-50"
                    onClick={() => setIsChatOpen(true)}
                >
                    <TbMessageChatbot size={36} />
                </div>
            )}

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px]  rounded-xl shadow-2xl flex flex-col overflow-hidden z-50"
                    style={{
                        background:
                            "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
                    }}
                >
                    {/* Header */}
                    <div className="bg-indigo-600 text-white flex justify-between items-center px-4 py-3">
                        <span className="font-semibold text-lg">Chatbot</span>
                        <button onClick={() => setIsChatOpen(false)} className="text-white text-xl font-bold">
                            <X />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 px-4 py-3 overflow-y-auto space-y-2 flex flex-col scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[80%] px-4 py-2 rounded-2xl break-words whitespace-pre-wrap ${msg.type === "user"
                                    ? "bg-blue-500 text-white self-end rounded-br-none"
                                    : "bg-gray-200 text-gray-800 self-start rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {typing && (
                            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-[60%] animate-pulse self-start">
                                Chatbot is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>

                    {/* Input Area */}
                    <div className="flex items-center p-3 border-t border-gray-200 bg-gray-50">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && generateResponse(message)}
                            placeholder="Type your message..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button
                            onClick={() => generateResponse(message)}
                            disabled={!message.trim()}
                            className="w-16 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold inline-flex items-center justify-center gap-2 shadow-[1px_5px_0_0_#4338ca] transition-all duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-[1px_8px_0_0_#4338ca] active:translate-y-[3px] active:shadow-[0_0_0_0_#4338ca]"

                        >
                            <IoSend size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
