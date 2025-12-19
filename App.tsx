
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Target, Calendar, MessageSquare, Menu, BrainCircuit, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';
import { Goal, RoutineItem } from './types';
import Dashboard from './components/Dashboard';
import GoalPlanner from './components/GoalPlanner';
import RoutineGenerator from './components/RoutineGenerator';
import AIAdvisor from './components/AIAdvisor';

declare global {
  interface Window {
    Cookiebot: any;
  }
}

const App: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Run a Marathon', category: 'Health', targetDate: '2024-12-01', status: 'active' },
    { id: '2', title: 'Learn TypeScript Deeply', category: 'Skill', targetDate: '2024-06-15', status: 'active' },
  ]);
  
  const [routine, setRoutine] = useState<RoutineItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleOpenCookieSettings = () => {
    if (window.Cookiebot) {
      window.Cookiebot.renew();
    }
  };

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden font-sans">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-lg text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          border-r border-white/10
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg btn-peach">
                <Sparkles size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Zenith AI</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Home" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink to="/goals" icon={<Target size={20} />} label="Features" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink to="/routine" icon={<Calendar size={20} />} label="Plans" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink to="/coach" icon={<MessageSquare size={20} />} label="Contact" onClick={() => setIsSidebarOpen(false)} />
            </nav>

            <div className="p-4 mt-auto">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-blue-300 font-medium uppercase mb-1">AI Engine</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-semibold">Gemini 3 Pro</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
          {/* Header */}
          <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 glass-header">
            <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-sm font-medium text-white/70">Architecting Your Future</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/10">
                <BrainCircuit size={16} />
                <span>AI Live</span>
              </div>
              <img 
                src="https://picsum.photos/seed/zenith/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-white/30 shadow-sm"
              />
            </div>
          </header>

          <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full flex-1">
            <Routes>
              <Route path="/" element={<Dashboard goals={goals} routine={routine} />} />
              <Route path="/goals" element={<GoalPlanner goals={goals} setGoals={setGoals} />} />
              <Route path="/routine" element={<RoutineGenerator goals={goals} routine={routine} setRoutine={setRoutine} />} />
              <Route path="/coach" element={<AIAdvisor goals={goals} routine={routine} />} />
            </Routes>
          </div>

          {/* Compliance Footer */}
          <footer className="mt-auto px-6 py-8 border-t border-white/10 footer-glass">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-300" />
                <span className="text-sm font-bold">Zenith AI Life Planner</span>
                <span className="text-xs font-medium ml-2 border-l border-white/20 pl-3">© 2025 All rights reserved.</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                <button 
                  onClick={handleOpenCookieSettings}
                  className="text-xs font-bold uppercase tracking-wider hover:text-gold transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck size={14} />
                  Manage Cookies
                </button>
                <a href="#" className="text-xs font-bold uppercase tracking-wider hover:text-gold transition-colors">Privacy</a>
                <a href="#" className="text-xs font-bold uppercase tracking-wider hover:text-gold transition-colors">Terms</a>
                <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider hover:text-gold transition-colors flex items-center gap-1">
                  Powered by Gemini
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </HashRouter>
  );
};

const SidebarLink: React.FC<{ to: string, icon: React.ReactNode, label: string, onClick: () => void }> = ({ to, icon, label, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all group"
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export default App;
