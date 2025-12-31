
import React from 'react';
import { WorkoutSession } from '../types';

interface WorkoutCardProps {
  session: WorkoutSession;
  onJoin: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ session, onJoin }) => {
  const formattedDate = new Date(session.startTime).toLocaleString([], { 
    weekday: 'short', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Yoga': return 'bg-emerald-100 text-emerald-800';
      case 'Gym': return 'bg-blue-100 text-blue-800';
      case 'Running': return 'bg-rose-100 text-rose-800';
      case 'CrossFit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelBadge = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-50 text-green-600 border-green-100';
      case 'Intermediate': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Advanced': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all p-5 flex flex-col h-full hover:shadow-lg ${session.joined ? 'border-indigo-200' : 'border-gray-100'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getTypeColor(session.type)}`}>
            {session.type}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getLevelBadge(session.level)}`}>
            {session.level}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400 text-xs font-medium">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="flex items-start space-x-3 mb-3">
        <img src={session.host.avatar} className="w-10 h-10 rounded-full border-2 border-indigo-50" alt={session.host.name} />
        <div>
          <h4 className="text-base font-bold text-gray-800 leading-tight">{session.title}</h4>
          <p className="text-xs text-gray-400">hosted by {session.host.name}</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow italic">"{session.description || 'No description provided.'}"</p>

      <div className="flex items-center space-x-2 text-xs text-indigo-500 font-bold mb-4 bg-indigo-50/50 p-2 rounded-lg">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
        <span className="truncate uppercase">{session.locationName}</span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {[...Array(Math.min(session.participantCount, 3))].map((_, i) => (
              <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=part${i + session.id}`} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" alt="Member" />
            ))}
          </div>
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">
            {session.participantCount}/{session.maxParticipants} joined
          </span>
        </div>

        <button 
          onClick={onJoin}
          className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            session.joined 
              ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
              : 'bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-95'
          }`}
        >
          {session.joined ? 'Cancel' : 'Join'}
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
