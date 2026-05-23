import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AICopilot = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your PMBIDMATRIX Procurement Copilot. How can I assist you with strategic sourcing or risk analysis today?', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "Analyze steel price trends",
    "Identify high-risk suppliers",
    "Generate RFQ for IT hardware",
    "Summarize Q2 spend vs budget"
  ];

  const handleSend = (text: string) => {
    if (!text) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Based on current market data and our internal supplier risk models, I've analyzed your request regarding "${text}". Our predictive analytics indicate a potential 12% savings if we initiate a reverse auction within the next 14 days before the projected commodity price spike.`, 
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
      }]);
    }, 1500);
  };

  return (
    <div className="p-6 text-gray-100 bg-dark-950 h-screen flex flex-col">
      <header className="mb-6 pb-4 border-b border-dark-800">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center">
          <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          AI Strategic Copilot
        </h1>
        <p className="text-gray-400 mt-1">Natural language querying for procurement intelligence</p>
      </header>

      <div className="flex-grow flex flex-col lg:flex-row gap-6 overflow-hidden pb-10">
        {/* Main Chat Area */}
        <div className="flex-grow flex flex-col bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 shadow-xl overflow-hidden">
          
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm' 
                    : 'bg-dark-800 border border-dark-700 text-gray-200 rounded-tl-sm'
                }`}>
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-2 mx-1">{msg.timestamp}</span>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
                <div className="bg-dark-800 border border-dark-700 rounded-2xl rounded-tl-sm p-4 flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 bg-dark-900 border-t border-dark-800">
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
              {suggestions.map((s, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSend(s)}
                  className="whitespace-nowrap px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm hover:bg-blue-500/20 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your procurement AI assistant..."
                className="w-full bg-dark-950 border border-dark-700 rounded-xl py-4 pl-4 pr-16 text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-inner"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>

        {/* AI Context Panel */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col space-y-6">
          <div className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 p-6 shadow-lg">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Active Context</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-dark-800 pb-2">
                <span className="text-sm text-gray-300">Data Model</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Synced</span>
              </div>
              <div className="flex justify-between items-center border-b border-dark-800 pb-2">
                <span className="text-sm text-gray-300">Knowledge Base</span>
                <span className="text-xs text-gray-400">Oracle ERP Data</span>
              </div>
              <div className="flex justify-between items-center border-b border-dark-800 pb-2">
                <span className="text-sm text-gray-300">Market Feed</span>
                <span className="text-xs text-blue-400">Live LME Prices</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur rounded-xl border border-purple-500/30 p-6 shadow-lg flex-grow">
            <h3 className="font-semibold text-purple-300 mb-2">Pro Tip</h3>
            <p className="text-sm text-gray-300">
              You can ask the Copilot to draft RFQs, compare supplier risk scores, or even simulate the impact of a 10% tariff increase on your raw material spend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
