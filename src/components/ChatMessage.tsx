
import { RotateCcw, Link } from 'lucide-react';
import { Message, LLMResponse } from '../types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  message: Message;
  showControls?: boolean;
  onRegenerate?: () => void;
  canRegenerate?: boolean;
}

function isLLMResponse(content: string | LLMResponse): content is LLMResponse {
  return typeof content === 'object' && 'answer' in content;
}

export default function ChatMessage({ 
  message, 
  showControls = false,
  onRegenerate,
  canRegenerate
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div
        className={`${
          isUser 
            ? 'max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl' 
            : 'max-w-full w-full'
        } px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-orange-500 text-white rounded-br-md'
            : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
        }`}
      >
        {isUser ? (
          <div className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {message.content as string}
          </div>
        ) : (
          <div className="space-y-4">
            {isLLMResponse(message.content) ? (
              <>
                <div className="prose prose-sm max-w-none prose-pre:bg-gray-50">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        
                        if (inline) {
                          return (
                            <code className="bg-gray-100 rounded px-1 font-mono text-sm" {...props}>
                              {children}
                            </code>
                          );
                        }
                        
                        return (
                          <SyntaxHighlighter
                            style={vs}
                            language={language}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: '0.5rem',
                              background: '#f8f9fa',
                              border: '1px solid #e9ecef',
                            }}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        );
                      },
                      pre({children}) {
                        return <>{children}</>;
                      }
                    }}
                  >
                    {message.content.answer}
                  </ReactMarkdown>
                </div>
                {message.content.sources_used.length > 0 && (
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Link size={12} />
                      <span>Sources:</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {message.content.sources_used.map((source, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
                {message.content}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col space-y-2 mt-2">
          <p className={`text-xs ${isUser ? 'text-orange-100' : 'text-gray-400'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          {showControls && canRegenerate && (
            <div className="flex space-x-2">
              <button
                onClick={onRegenerate}
                className="flex items-center space-x-1 px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                <RotateCcw size={14} />
                <span className="text-xs font-medium">Regenerate</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}