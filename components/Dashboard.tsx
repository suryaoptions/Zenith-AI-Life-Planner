
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Goal, RoutineItem } from '../types';
import { CheckCircle2, Clock, Target, TrendingUp, Sparkles, Plus } from 'lucide-react';

interface Props {
  goals: Goal[];
  routine: RoutineItem[];
}

const Dashboard: React.FC<Props> = ({ goals, routine }) => {
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Connect Gemini API account', completed: false },
    { id: 't2', title: 'Enable smart authorizations', completed: true },
    { id: 't3', title: 'Check Cookiebot CMP setup', completed: false },
    { id: 't4', title: 'Review 2025 Focus Plan', completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const performanceData = [
    { name: 'Mon', value: 85 },
    { name: 'Tue', value: 72 },
    { name: 'Wed', value: 90 },
    { name: 'Thu', value: 65 },
    { name: 'Fri', value: 88 },
    { name: 'Sat', value: 45 },
    { name: 'Sun', value: 30 },
  ];

  const categoryData = [
    { name: 'Deep Work', value: 40, color: '#6366f1' },
    { name: 'Rest', value: 30, color: '#2dd4bf' },
    { name: 'Health', value: 20, color: '#f59e0b' },
    { name: 'Social', value: 10, color: '#ec4899' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Left Panel: Sky Blue Hero / Daily Tasks */}
      <div className="left-hero-panel flex-1 max-w-full lg:max-w-sm rounded-[32px] p-8 shadow-2xl flex flex-col h-fit">
        <h2 className="text-3xl font-black mb-6 tracking-tight">Daily Tasks</h2>
        
        <div className="space-y-4 mb-8">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="flex items-center gap-4 group cursor-pointer"
              onClick={() => toggleTask(task.id)}
            >
              <div className={`w-6 h-6 rounded-md border-2 border-current flex items-center justify-center transition-all ${task.completed ? 'bg-current shadow-inner' : 'bg-transparent'}`}>
                {task.completed && <CheckCircle2 size={16} className="text-[#87ceeb]" />}
              </div>
              <span className={`text-lg font-bold transition-all ${task.completed ? 'line-through opacity-50' : ''}`}>
                {task.title}
              </span>
            </div>
          ))}
        </div>

        <button className="btn-peach w-full py-4 rounded-[50px] font-black text-lg mt-auto shadow-xl">
          Start Planning Now
        </button>
      </div>

      {/* Right Panel: Charts and Goals */}
      <div className="flex-[2] space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard 
            icon={<Target className="text-white" />} 
            label="Active Goals" 
            value={goals.length.toString()} 
            subtext="On track for 2025"
          />
          <StatCard 
            icon={<TrendingUp className="text-white" />} 
            label="Daily Progress" 
            value="84%" 
            subtext="World-class performance"
          />
        </div>

        <div className="glass-card p-6 rounded-[32px]">
          <h3 className="text-xl font-bold mb-8">Weekly Performance</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={40}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#feb47b' : 'rgba(255,255,255,0.2)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-[32px]">
          <h3 className="text-xl font-bold mb-6">Active Objectives</h3>
          <div className="grid grid-cols-1 gap-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-300">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{goal.title}</h4>
                    <p className="text-xs text-white/50 font-medium uppercase tracking-wider">{goal.category} • {goal.targetDate}</p>
                  </div>
                </div>
                <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full btn-peach w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, subtext: string }> = ({ icon, label, value, subtext }) => (
  <div className="glass-card p-6 rounded-[32px] hover:shadow-2xl transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2.5 rounded-xl bg-white/10">
        {icon}
      </div>
      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <h4 className="text-4xl font-black text-white tracking-tight">{value}</h4>
    </div>
    <p className="text-sm text-white/60 mt-2 font-medium">{subtext}</p>
  </div>
);

export default Dashboard;
