import { useState } from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import useChat from './hooks/useChat';
import { ProjectType, PROJECTS } from './types/chat';

function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectType>('Bitcoin Core');
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    stopGeneration, 
    regenerateLastResponse, 
    canRegenerate, 
    canStop, 
    clearChat 
  } = useChat();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex flex-col">
      <Header 
        onClearChat={clearChat} 
        messageCount={messages.length} 
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
      />
      
      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        <ChatContainer 
          messages={messages} 
          isLoading={isLoading}
          onStopGeneration={stopGeneration}
          onRegenerate={regenerateLastResponse}
          canStop={canStop}
          canRegenerate={canRegenerate}
        />
        <div className="px-4">
          <ChatInput 
            onSendMessage={sendMessage} 
            isLoading={isLoading}
            onStopGeneration={stopGeneration}
            canStop={canStop}
          />
        </div>
      </main>
    </div>
  );
}

export default App;