
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, BrainCircuit, Lightbulb, Coffee, Zap, Loader2 } from 'lucide-react';
import { Goal, RoutineItem } from '../types';
import { chatWithCoach } from '../services/geminiService';

interface Props {
  goals: Goal[];
  routine: RoutineItem[];
}

const AIAdvisor: React.FC<Props> = ({ goals, routine }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Welcome to your sanctum of growth. I am Zenith, your AI performance architect. How can I help you sharpen your vision today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithCoach(userMsg, []);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Forgive me, my neural circuits are recalibrating. Could you repeat that?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Suggestions Row */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <SuggestionChip icon={<BrainCircuit size={14} />} text="Review focus blocks" />
        <SuggestionChip icon={<Lightbulb size={14} />} text="New habit strategy" />
        <SuggestionChip icon={<Zap size={14} />} text="Overcoming procrastination" />
        <SuggestionChip icon={<Coffee size={14} />} text="Optimize rest" />
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xl flex flex-col overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-1" style={{ background: 'linear-gradient(90deg, #667eea, #764ba2)' }} />
        
        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === 'bot' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
              }`} style={msg.role === 'bot' ? { background: 'linear-gradient(90deg, #667eea, #764ba2)' } : {}}>
                {msg.role === 'bot' ? <Sparkles size={20} /> : <User size={20} />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                msg.role === 'bot' 
                  ? 'bg-slate-50 border border-slate-100 text-slate-800 font-medium' 
                  : 'btn-gradient text-white font-medium ml-auto'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Loader2 className="text-indigo-600 animate-spin" size={20} />
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl w-32">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Ask Zenith anything..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-5 pr-14 py-4 text-slate-800 font-medium shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 top-2 p-3 btn-gradient rounded-xl shadow-lg shadow-indigo-600/20 disabled:bg-slate-300"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">
            Zenith AI Architecture Powered by Gemini Flash 3
          </p>
        </div>
      </div>
    </div>
  );
};

const SuggestionChip: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm whitespace-nowrap">
    {icon}
    {text}
  </button>
);

export default AIAdvisor;
