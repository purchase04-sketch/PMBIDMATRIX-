import React from 'react';

interface ChatBubbleProps {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content, timestamp }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        isUser 
          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm' 
          : 'bg-dark-800 border border-dark-700 text-gray-200 rounded-tl-sm'
      }`}>
        <p className="leading-relaxed">{content}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1 mx-2">{timestamp}</span>
    </div>
  );
};
