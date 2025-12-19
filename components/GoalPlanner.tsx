
import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Tag, ChevronRight, Target, X } from 'lucide-react';
import { Goal } from '../types';

interface Props {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

const GoalPlanner: React.FC<Props> = ({ goals, setGoals }) => {
  const [newGoal, setNewGoal] = useState({ title: '', category: 'Personal', targetDate: '' });
  const [isAdding, setIsAdding] = useState(false);

  const addGoal = () => {
    if (!newGoal.title || !newGoal.targetDate) return;
    const goal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newGoal.title,
      category: newGoal.category as any,
      targetDate: newGoal.targetDate,
      status: 'active'
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: '', category: 'Personal', targetDate: '' });
    setIsAdding(false);
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Mission Control</h2>
          <p className="text-white/60 font-medium">Define your future, one objective at a time.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 btn-peach px-6 py-3 rounded-full font-bold"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? 'Cancel' : 'New Goal'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-card p-8 rounded-[32px] space-y-6 animate-in zoom-in-95 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70 ml-1">What is your objective?</label>
              <input 
                type="text" 
                placeholder="e.g., Connect Google AdSense" 
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-peach-500 outline-none"
                value={newGoal.title}
                onChange={e => setNewGoal({...newGoal, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70 ml-1">Category</label>
              <select 
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-peach-500 outline-none appearance-none"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                value={newGoal.category}
                onChange={e => setNewGoal({...newGoal, category: e.target.value})}
              >
                <option className="bg-slate-800">Career</option>
                <option className="bg-slate-800">Health</option>
                <option className="bg-slate-800">Personal</option>
                <option className="bg-slate-800">Financial</option>
                <option className="bg-slate-800">Skill</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70 ml-1">Target Date</label>
              <input 
                type="date" 
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-peach-500 outline-none"
                value={newGoal.targetDate}
                onChange={e => setNewGoal({...newGoal, targetDate: e.target.value})}
              />
            </div>
          </div>
          <button 
            onClick={addGoal}
            className="w-full btn-peach py-4 rounded-full font-bold text-lg"
          >
            Launch Goal
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className="group flex items-center justify-between p-6 glass-card rounded-[32px] hover:border-white/30 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-300 group-hover:bg-peach-500/20 group-hover:text-peach-400 transition-all">
                <Target size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white">{goal.title}</h4>
                <div className="flex items-center gap-4 text-sm font-medium text-white/50">
                  <span className="flex items-center gap-1.5"><Tag size={14} className="text-blue-400" /> {goal.category}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-pink-400" /> Due {goal.targetDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all" onClick={() => removeGoal(goal.id)}>
                <Trash2 size={20} />
              </button>
              <div className="p-3 text-white/30 hover:text-blue-400 hover:bg-white/5 rounded-xl cursor-pointer">
                <ChevronRight size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalPlanner;
