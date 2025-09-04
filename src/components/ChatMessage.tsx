import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div
            className={`max-w-3xl px-4 py-3 rounded-lg ${
                isUser
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-800 shadow-sm border'
            }`}
        >
          {isUser ? (
              <p className="whitespace-pre-wrap">{message.content as string}</p>
          ) : (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={oneLight}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-md"
                                {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                              {children}
                            </code>
                        );
                      },
                      p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-orange-600">{children}</strong>,
                      h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-gray-800">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 text-gray-800">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-md font-semibold mb-2 text-gray-700">{children}</h3>,
                      ul: ({ children }) => <ul className="mb-3 pl-4">{children}</ul>,
                      ol: ({ children }) => <ol className="mb-3 pl-4">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                    }}
                >
                  {message.content as string}
                </ReactMarkdown>
              </div>
          )}
          <div className={`text-xs mt-2 ${isUser ? 'text-orange-100' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
  );
};

export default ChatMessage;