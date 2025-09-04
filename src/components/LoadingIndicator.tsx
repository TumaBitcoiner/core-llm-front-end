import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 px-4 py-3 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-gray-600">Thinking...</span>
        </div>
      </div>
    </div>
  );
}