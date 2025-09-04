export interface LLMResponse {
  answer: string;
  context_documents: number;
  question: string;
  sources_used: string[];
  success: boolean;
}

export interface Message {
  id: string;
  content: string | LLMResponse;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  prompt: string;
}