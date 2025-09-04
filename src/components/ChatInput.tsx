import { useState, KeyboardEvent } from 'react';
import { Send, Maximize2, Minimize2, Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStopGeneration: () => void;
  isLoading: boolean;
  canStop: boolean;
}

export default function ChatInput({ onSendMessage, onStopGeneration, isLoading, canStop }: ChatInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (prompt.trim() && !isLoading) {
      onSendMessage(prompt.trim());
      setPrompt('');
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 to-transparent pt-6 pb-16">
      <div className={`flex items-end space-x-3 bg-white rounded-2xl border border-gray-200 shadow-lg p-3 backdrop-blur-sm bg-white/95 transition-all duration-300 ${
        isExpanded ? 'min-h-[200px]' : ''
      }`}>
        <div className="flex flex-col space-y-2 flex-1">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Core LLM anything..."
            className={`w-full resize-none border-0 outline-none text-gray-800 placeholder-gray-500 text-sm leading-relaxed bg-transparent ${
              isExpanded ? 'min-h-[120px] max-h-[120px]' : 'max-h-32 min-h-[2.5rem]'
            }`}
            rows={isExpanded ? 6 : 1}
          disabled={isLoading}
          style={{
            height: isExpanded ? '120px' : 'auto',
            minHeight: isExpanded ? '120px' : '2.5rem',
          }}
          onInput={(e) => {
            if (isExpanded) return;
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = Math.min(target.scrollHeight, 128) + 'px';
          }}
        />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleExpanded}
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
            title={isExpanded ? "Minimize dialog" : "Expand dialog"}
          >
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          {canStop && (
            <button
              onClick={onStopGeneration}
              className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Square size={16} />
              <span className="text-xs font-medium">Stop</span>
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              prompt.trim() && !isLoading
                ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}