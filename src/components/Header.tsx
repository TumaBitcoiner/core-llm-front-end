import React from 'react';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  onClearChat: () => void;
  messageCount: number;
}

export default function Header({ onClearChat, messageCount }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-bold">₿</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Core LLM</h1>
            <p className="text-sm text-gray-600">AI Assistant</p>
          </div>
        </div>
        
        {messageCount > 0 && (
          <button
            onClick={onClearChat}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <RotateCcw size={16} />
            <span className="text-sm font-medium">Clear Chat</span>
          </button>
        )}
      </div>
    </header>
  );
}