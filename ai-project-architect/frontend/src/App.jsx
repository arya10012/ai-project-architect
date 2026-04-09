import React, { useState } from 'react';
import { Bot, Code2, LayoutDashboard, Settings } from 'lucide-react';
import InputForm from './components/InputForm';
import ProjectDashboard from './components/ProjectDashboard';

function App() {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/projects/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setProjectData(data);
      } else {
        throw new Error("Backend unavailable");
      }
    } catch (error) {
      console.error("Backend Error or API Error:", error);
      alert("Failed to connect to AI Backend! Please check the terminal for Java errors. " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 glass-panel border-l-0 border-t-0 border-b-0 rounded-none flex flex-col items-center md:items-start z-10 transition-all duration-300">
        <div className="p-4 md:p-6 w-full flex items-center justify-center md:justify-start gap-3">
          <div className="bg-brand p-2 rounded-xl">
            <Bot size={24} className="text-white" />
          </div>
          <h1 className="hidden md:block text-xl font-bold text-white tracking-tight">Project<br/>Architect</h1>
        </div>
        <nav className="flex-1 w-full flex flex-col gap-2 p-3 mt-4">
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-glass border border-glassBorder text-white transition-colors">
            <LayoutDashboard size={20} />
            <span className="hidden md:block font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-glass transition-colors">
            <Settings size={20} />
            <span className="hidden md:block font-medium">Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth p-4 md:p-8">
        
        {/* Background Gradients for Aesthetics */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-8">
          
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Generate AI Project Idea</h2>
              <p className="text-gray-400">Craft production-ready architectures instantly.</p>
            </div>
          </header>

          <InputForm onGenerate={handleGenerate} loading={loading} />

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
              <p className="text-brand font-medium animate-pulse">Consulting LLM... Generating Architecture...</p>
            </div>
          )}

          {!loading && projectData && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
              <ProjectDashboard data={projectData} />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
