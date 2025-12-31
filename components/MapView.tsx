
import React from 'react';
import { WorkoutSession } from '../types';

interface MapViewProps {
  sessions: WorkoutSession[];
  userLocation: {lat: number, lng: number} | null;
  onJoin: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ sessions, userLocation, onJoin }) => {
  return (
    <div className="relative h-[calc(100vh-160px)] md:h-[600px] w-full bg-gray-200 rounded-3xl overflow-hidden shadow-inner">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover opacity-50 grayscale"></div>
      
      {/* Map Pins Mock */}
      {sessions.map((session, idx) => (
        <div 
          key={session.id}
          className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
          style={{ 
            top: `${20 + (idx * 25)}%`, 
            left: `${30 + (idx * 20)}%` 
          }}
        >
          <div className="bg-indigo-600 text-white p-1 rounded-full shadow-xl mb-1 hover:scale-110 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
          </div>
          
          <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white p-3 rounded-xl shadow-2xl w-48 z-50">
            <h4 className="font-bold text-sm">{session.title}</h4>
            <p className="text-xs text-gray-500 mb-2">{session.locationName}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); onJoin(session.id); }}
              className={`w-full py-1.5 rounded-lg text-xs font-bold ${session.joined ? 'bg-gray-100 text-gray-500' : 'bg-indigo-600 text-white'}`}
            >
              {session.joined ? 'Going' : 'Join Session'}
            </button>
          </div>
        </div>
      ))}

      {/* User Location Pulse */}
      {userLocation && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"></div>
          </div>
        </div>
      )}

      {/* Overlay UI */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex bg-white p-1 rounded-2xl shadow-xl z-10">
        <button className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded-xl">Sessions</button>
        <button className="px-4 py-2 text-sm font-bold text-gray-500">Gyms</button>
        <button className="px-4 py-2 text-sm font-bold text-gray-500">Events</button>
      </div>

      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="bg-white p-2 rounded-xl shadow-md text-gray-600 hover:text-indigo-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
        <button className="bg-white p-2 rounded-xl shadow-md text-gray-600 hover:text-indigo-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button>
      </div>
    </div>
  );
};

export default MapView;
