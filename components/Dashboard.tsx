
import React, { useState, useEffect } from 'react';
import { WorkoutSession, User } from '../types';
import WorkoutCard from './WorkoutCard';
import { generateWorkoutMotivation } from '../services/geminiService';

interface DashboardProps {
  user: User;
  sessions: WorkoutSession[];
  onJoin: (id: string) => void;
  onCreateClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, sessions, onJoin, onCreateClick }) => {
  const [quote, setQuote] = useState<string>("Loading motivation...");

  useEffect(() => {
    generateWorkoutMotivation(user.interests[0] || 'Gym').then(setQuote);
  }, [user.interests]);

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="bg-gradient-athletic rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-bold uppercase">
              {user.fitnessLevel}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Ready to sweat, {user.name.split(' ')[0]}?</h2>
          <p className="text-indigo-100 text-lg italic leading-tight">"{quote}"</p>
          <div className="mt-6 flex space-x-3">
            <button 
              onClick={onCreateClick}
              className="bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              <span>Host Session</span>
            </button>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -right-5 -top-5 w-20 h-20 bg-white opacity-5 rounded-full"></div>
      </section>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
          <div className="text-indigo-600 font-bold text-xl">4</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Upcoming</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
          <div className="text-indigo-600 font-bold text-xl">1.2mi</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Closest</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
          <div className="text-indigo-600 font-bold text-xl">12</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Matches</div>
        </div>
      </div>

      {/* Sessions Nearby */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Sessions For You</h3>
          <div className="flex space-x-2">
            <button className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold">Recommended</button>
            <button className="text-xs text-gray-400 px-3 py-1 rounded-full font-bold">Newest</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map(session => (
            <WorkoutCard key={session.id} session={session} onJoin={() => onJoin(session.id)} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
