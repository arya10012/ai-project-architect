import React, { useState } from 'react';
import { Sparkles, Code, BrainCircuit, GraduationCap } from 'lucide-react';

const InputForm = ({ onGenerate, loading }) => {
  const [skills, setSkills] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Intermediate");
  const [interest, setInterest] = useState("Web Development");

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
    onGenerate({
      skills: skillsArray,
      experienceLevel,
      interest
    });
  };

  return (
    <div className="glass-panel p-6 md:p-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Skills Input */}
        <div className="space-y-2 md:col-span-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Code size={16} className="text-brand" />
            Your Skills (comma separated)
          </label>
          <input 
            type="text" 
            placeholder="e.g. Java, React, SQL"
            className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>

        {/* Experience Dropdown */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <GraduationCap size={16} className="text-brand" />
            Experience Level
          </label>
          <select 
            className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Interest Dropdown */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <BrainCircuit size={16} className="text-brand" />
            Area of Interest
          </label>
          <select 
            className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="Web Development">Web Development</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3 flex justify-end mt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-white transition-all bg-brand border border-transparent rounded-xl hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-darkBg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
            <Sparkles size={18} className="relative z-10" />
            <span className="relative z-10">Generate Project</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default InputForm;
