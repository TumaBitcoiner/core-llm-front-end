export interface Project {
  id: 'Bitcoin Core' | 'Core Lightning' | 'Bark';
  name: string;
  description: string;
  message: string;
  icon: {
    symbol: string;
    backgroundColor: string;
    symbolColor: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'Bitcoin Core',
    name: 'Bitcoin Core',
    description: 'Bitcoin Protocol Development',
    message: 'Ask questions about C++ Bitcoin Core code with references from the GitHub repository. I can help you understand implementations, analyze code patterns, and explore the codebase.',
    icon: {
      symbol: '₿',
      backgroundColor: 'from-orange-500 to-orange-600',
      symbolColor: 'text-white'
    }
  },
  {
    id: 'Core Lightning',
    name: 'Core Lightning',
    description: 'Lightning Network Implementation',
    message: 'Ask questions about Core Lightning implementation. I can help you understand the Lightning Network protocol, analyze the codebase, and explore its features.',
    icon: {
      symbol: '⚡',
      backgroundColor: 'from-black to-gray-900',
      symbolColor: 'text-yellow-400'
    }
  },
  {
    id: 'Bark',
    name: 'Bark',
    description: 'Ark Implementation from Second',
    message: 'Explore the Bark Ark implementation From Second. I can help you understand the Ark protocol,analyze the codebase, and explore its features.',
    icon: {
      symbol: '🐕',
      backgroundColor: 'from-[#f4cf35] to-[#f4cf35]',
      symbolColor: 'text-white'
    }
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