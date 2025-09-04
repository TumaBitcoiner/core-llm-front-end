export interface Project {
  id: 'Bitcoin Core' | 'Core Lightning' | 'Bark';
  name: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'Bitcoin Core',
    name: 'Bitcoin Core',
    description: 'Bitcoin Protocol Development'
  },
  {
    id: 'Core Lightning',
    name: 'Core Lightning',
    description: 'Lightning Network Implementation'
  },
  {
    id: 'Bark',
    name: 'Bark',
    description: 'Ark Implementation from Second'
  }
];

export type ProjectType = Project['id'];

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