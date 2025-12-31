
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
      case 'Yoga': return 'bg-teal-100 text-teal-800';
      case 'Gym': return 'bg-orange-100 text-orange-800';
      case 'Running': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getTypeColor(session.type)}`}>
          {session.type}
        </span>
        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{formattedDate}</span>
        </div>
      </div>

      <h4 className="text-lg font-bold text-gray-800 mb-1 leading-tight">{session.title}</h4>
      <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">{session.description}</p>

      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
        <span className="truncate">{session.locationName}</span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {[...Array(Math.min(session.participantCount, 3))].map((_, i) => (
              <img key={i} src={`https://picsum.photos/seed/p${i + 10}/50`} className="w-7 h-7 rounded-full border-2 border-white" alt="Member" />
            ))}
            {session.participantCount > 3 && (
              <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                +{session.participantCount - 3}
              </div>
            )}
          </div>
          <span className="text-xs font-medium text-gray-400">
            {session.participantCount}/{session.maxParticipants} spots
          </span>
        </div>

        <button 
          onClick={onJoin}
          className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-colors ${
            session.joined 
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {session.joined ? 'Going' : 'Join'}
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
