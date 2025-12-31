
import React, { useState, useEffect } from 'react';
import { WorkoutSession } from '../types';
import WorkoutCard from './WorkoutCard';
import { generateWorkoutMotivation } from '../services/geminiService';

interface DashboardProps {
  sessions: WorkoutSession[];
  onJoin: (id: string) => void;
  onCreateClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ sessions, onJoin, onCreateClick }) => {
  const [quote, setQuote] = useState<string>("Loading motivation...");

  useEffect(() => {
    generateWorkoutMotivation('Gym').then(setQuote);
  }, []);

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <section className="bg-gradient-athletic rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Alex!</h2>
          <p className="text-indigo-100 text-lg italic">"{quote}"</p>
          <div className="mt-6 flex space-x-3">
            <button 
              onClick={onCreateClick}
              className="bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg"
            >
              Start a Session
            </button>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -right-5 -top-5 w-20 h-20 bg-white opacity-5 rounded-full"></div>
      </section>

      {/* Sessions Nearby */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Available Nearby</h3>
          <span className="text-sm text-indigo-600 font-medium">View All</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map(session => (
            <WorkoutCard key={session.id} session={session} onJoin={() => onJoin(session.id)} />
          ))}
        </div>
        
        {sessions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <p className="text-gray-600">No sessions found in your immediate area.</p>
            <button onClick={onCreateClick} className="mt-4 text-indigo-600 font-bold">Host the first one!</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
