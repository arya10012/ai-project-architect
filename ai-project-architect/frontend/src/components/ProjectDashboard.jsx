import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Layers, Rocket, Target, ListTodo, Map } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444'];

const ProjectDashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="glass-panel p-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-brand/20 text-brand rounded-full text-xs font-semibold uppercase tracking-wider">
                {data.difficultyLevel}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Rocket size={14}/> {data.estimatedCompletionTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
              {data.title}
            </h1>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-2">
              <Target size={18} className="text-pink-500" />
              Problem Statement
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {data.problemStatement}
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-2">
              <Layers size={18} className="text-teal-400" />
              Unique Solution
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {data.uniqueSolution}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Architecture & Features */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Features List */}
        <div className="lg:col-span-1 glass-panel p-6">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-4">
            <ListTodo size={20} className="text-brand" />
            Key Features
          </h3>
          <ul className="space-y-4">
            {data.keyFeatures?.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-darkBg/30 p-3 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="mt-1 w-2 h-2 rounded-full bg-brand flex-shrink-0" />
                <span className="text-sm text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture & Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel p-6">
             <h3 className="text-xl font-semibold text-white mb-4">System Architecture</h3>
             <pre className="bg-darkBg/50 p-4 rounded-xl border border-gray-800 text-sm text-blue-400 font-mono overflow-x-auto whitespace-pre-wrap">
               {data.systemArchitecture}
             </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Skill Chart */}
            <div className="glass-panel p-6 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-white mb-6 self-start">Skill Distribution</h3>
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.skillDistribution} dataKey="percentage" nameKey="skill" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                      {data.skillDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px' }} itemStyle={{ color: '#fff' }}/>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Effort Chart */}
            <div className="glass-panel p-6 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-white mb-6 self-start">Effort by Module</h3>
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.effortDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="module" stroke="#6b7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: '#374151', opacity: 0.4}} contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                      {data.effortDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProjectDashboard;
