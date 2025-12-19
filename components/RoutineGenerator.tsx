
import React, { useState } from 'react';
import { Wand2, Clock, Coffee, Dumbbell, Brain, Zap, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Goal, RoutineItem, UserPreferences } from '../types';
import { generateRoutine } from '../services/geminiService';

interface Props {
  goals: Goal[];
  routine: RoutineItem[];
  setRoutine: React.Dispatch<React.SetStateAction<RoutineItem[]>>;
}

const RoutineGenerator: React.FC<Props> = ({ goals, routine, setRoutine }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    wakeUpTime: '07:00',
    sleepTime: '22:30',
    focusTime: 'Morning',
    interests: ['Tech', 'Philosophy', 'Fitness']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (goals.length === 0) {
      setError("Please add some goals before generating a routine.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await generateRoutine(goals, preferences);
      setRoutine(result);
    } catch (err) {
      console.error(err);
      setError("The AI architect is busy. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('work') || cat.includes('deep')) return <Brain className="text-indigo-500" />;
    if (cat.includes('fitness') || cat.includes('movement')) return <Dumbbell className="text-teal-500" />;
    if (cat.includes('rest') || cat.includes('sleep')) return <Coffee className="text-amber-500" />;
    if (cat.includes('skill') || cat.includes('learning')) return <Zap className="text-pink-500" />;
    return <Sparkles className="text-slate-400" />;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Routine Architect</h2>
          <p className="text-slate-500 font-medium max-w-lg">Synchronize your biological clock with your highest ambitions using Gemini intelligence.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 btn-gradient px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/30 whitespace-nowrap disabled:bg-slate-300 disabled:shadow-none"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
          {loading ? 'Designing...' : 'Optimize Routine'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-medium">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Biometric Settings</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Wake Up</label>
                  <input 
                    type="time" 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2.5 font-bold outline-none" 
                    value={preferences.wakeUpTime}
                    onChange={e => setPreferences({...preferences, wakeUpTime: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Sleep</label>
                  <input 
                    type="time" 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2.5 font-bold outline-none"
                    value={preferences.sleepTime}
                    onChange={e => setPreferences({...preferences, sleepTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Peak Focus</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Morning', 'Afternoon', 'Evening'].map((time) => (
                    <button 
                      key={time}
                      onClick={() => setPreferences({...preferences, focusTime: time as any})}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        preferences.focusTime === time 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl text-white shadow-xl shadow-indigo-500/20" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-indigo-200" />
              <h3 className="font-bold">AI Insight</h3>
            </div>
            <p className="text-indigo-50 leading-relaxed text-sm">
              Gemini Architecture syncs your Deep Work blocks with peak circadian performance.
            </p>
          </div>
        </div>

        {/* Routine Display Column */}
        <div className="lg:col-span-2 space-y-4">
          {routine.length > 0 ? (
            <div className="space-y-4 relative">
              <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-100 -z-10" />
              {routine.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group flex gap-6 p-4 bg-white rounded-3xl border border-slate-200 hover:shadow-lg hover:border-indigo-100 transition-all animate-in slide-in-from-right-4 duration-300"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex flex-col items-center min-w-[56px]">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {getIcon(item.category)}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-black text-slate-800 text-lg">{item.activity}</h4>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{item.category} • {item.duration}</p>
                    </div>
                    <div className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl border border-slate-100 font-bold flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-indigo-500" />
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Clock className="text-slate-300" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Your routine is a blank canvas</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Click optimize above to let Gemini weave your goals into a high-performance daily schedule.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutineGenerator;
