import { useEffect, useRef } from 'react';
import { Message, PROJECTS } from '../types/chat';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onStopGeneration: () => void;
  onRegenerate: () => void;
  canStop: boolean;
  canRegenerate: boolean;
  selectedProject: string;
}

export default function ChatContainer({ 
  messages, 
  isLoading, 
  onStopGeneration, 
  onRegenerate, 
  canStop, 
  canRegenerate,
  selectedProject
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Get the last message
    const lastMessage = messages[messages.length - 1];
    
    if (!lastMessage) return;

    // If it's a user message, always scroll to bottom and update the ref
    if (lastMessage.role === 'user') {
      lastUserMessageRef.current = lastMessage.id;
      scrollToBottom();
      return;
    }

    // If it's an assistant message, only scroll if it's a response to the last user message
    // and the content is relatively short (less than 500 characters)
    const isResponseToLastUserMessage = messages.some(
      (msg) => msg.id === lastUserMessageRef.current && msg.role === 'user'
    );

    if (isResponseToLastUserMessage && 
        typeof lastMessage.content === 'string' && 
        lastMessage.content.length < 500) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1 relative">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl text-white font-bold">₿</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Welcome to Core LLM</h3>
            <p className="text-gray-600 max-w-lg">
              {PROJECTS.find(p => p.id === selectedProject)?.message || 'Ask me anything about the project.'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message}
              showControls={!isLoading && index === messages.length - 1 && message.role !== 'user' && canRegenerate}
              onRegenerate={onRegenerate}
              canRegenerate={canRegenerate}
            />
          ))}
          {isLoading && <LoadingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}