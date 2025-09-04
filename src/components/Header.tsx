
import { RotateCcw } from 'lucide-react';
import { ProjectType, PROJECTS } from '../types/chat';

interface HeaderProps {
  onClearChat: () => void;
  messageCount: number;
  selectedProject: ProjectType;
  onProjectChange: (project: ProjectType) => void;
}

export default function Header({ onClearChat, messageCount, selectedProject, onProjectChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-bold">₿</span>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Core LLM</h1>
              <p className="text-sm text-gray-600">
                {PROJECTS.find(p => p.id === selectedProject)?.description || 'AI Assistant'}
              </p>
            </div>
            <select
              value={selectedProject}
              onChange={(e) => onProjectChange(e.target.value as ProjectType)}
              className="ml-4 block w-48 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            >
              {PROJECTS.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
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