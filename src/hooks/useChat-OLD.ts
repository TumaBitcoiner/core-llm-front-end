import { useState, useCallback } from 'react';
import { Message } from '../types/chat';
import testAnswerData from '../test/testAnswer-3.json';

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      // Simulate API call to LLM backend
      // In a real implementation, replace this with your actual API call
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 2000);
        controller.signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Request aborted'));
        });
      });
      
      if (controller.signal.aborted) return;

      // Using test answer from JSON file
      const testAnswer = testAnswerData;

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: testAnswer,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      if (error instanceof Error && error.message === 'Request aborted') {
        console.log('Request was aborted by user');
      } else {
        console.error('Error sending message:', error);
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          content: 'Sorry, there was an error processing your request. Please try again.',
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  }, []);

  const stopGeneration = useCallback(() => {
    if (abortController) {
      abortController.abort();
    }
  }, [abortController]);

  const regenerateLastResponse = useCallback(() => {
    if (messages.length >= 2) {
      const lastUserMessage = messages[messages.length - 2];
      if (lastUserMessage.role === 'user') {
        // Remove the last assistant message and regenerate
        setMessages(prev => prev.slice(0, -1));
        sendMessage(lastUserMessage.content as string);
      }
    }
  }, [messages, sendMessage]);
  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    stopGeneration,
    regenerateLastResponse,
    canRegenerate: messages.length >= 2 && messages[messages.length - 1]?.role === 'assistant' && !isLoading,
    canStop: isLoading,
    clearChat,
  };
}