
import React, { useState } from 'react';
import { getRecommendedGyms } from '../services/geminiService';
import { User, WorkoutType } from '../types';

interface FindBuddyProps {
  currentUser: User;
  userLocation: {lat: number, lng: number} | null;
}

const FindBuddy: React.FC<FindBuddyProps> = ({ currentUser, userLocation }) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{text: string, grounding: any[]}>({ text: '', grounding: [] });
  const [selectedType, setSelectedType] = useState<WorkoutType>(currentUser.interests[0] || 'Gym');

  const handleSearch = async () => {
    if (!userLocation) return;
    setLoading(true);
    const results = await getRecommendedGyms(userLocation.lat, userLocation.lng, selectedType);
    setRecommendations(results);
    setLoading(false);
  };

  const getMatchScore = (buddy: any) => {
    let score = 70;
    if (buddy.hobby === selectedType) score += 20;
    if (buddy.level === currentUser.fitnessLevel) score += 10;
    return Math.min(score, 99);
  };

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Buddy Radar</h2>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Now</span>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-indigo-50">
        <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6">Select activity to match</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {['Gym', 'Running', 'Yoga', 'Tennis'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type as WorkoutType)}
              className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${
                selectedType === type ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100 scale-105' : 'border-slate-50 text-slate-300'
              }`}
            >
              <div className="font-black text-xs uppercase tracking-widest">{type}</div>
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleSearch}
          disabled={loading || !userLocation}
          className="w-full bg-slate-800 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl disabled:opacity-50 transition transform active:scale-[0.98]"
        >
          {loading ? 'Analyzing Scene...' : 'Find Matches & Spots'}
        </button>
        {!userLocation && <p className="text-rose-500 text-[10px] mt-4 font-black uppercase tracking-widest text-center">Enable GPS for Match Radar</p>}
      </div>

      {recommendations.text && (
        <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-2xl animate-in slide-in-from-top duration-700">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center opacity-80">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            Proximity Insight
          </h3>
          <div className="text-indigo-50 text-sm leading-relaxed italic mb-6">
            "{recommendations.text}"
          </div>
          
          {recommendations.grounding.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-indigo-300">Verified Training Grounds</h4>
              <div className="flex flex-wrap gap-2">
                {recommendations.grounding.map((chunk, idx) => chunk.maps && (
                  <a 
                    key={idx} 
                    href={chunk.maps.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10 hover:bg-white hover:text-indigo-600 transition"
                  >
                    {chunk.maps.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggested Buddies */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">Nearby Compatible Souls</h3>
          <span className="text-[10px] text-indigo-600 font-black uppercase">Based on level: {currentUser.fitnessLevel}</span>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Jordan', hobby: 'Running', dist: '0.4 mi', level: 'Intermediate', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan' },
            { name: 'Casey', hobby: 'Gym', dist: '1.2 mi', level: 'Intermediate', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=casey' },
            { name: 'Riley', hobby: 'Yoga', dist: '0.8 mi', level: 'Beginner', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=riley' }
          ].map(buddy => (
            <div key={buddy.name} className="bg-white p-6 rounded-[1.5rem] flex items-center justify-between shadow-sm border border-slate-50 hover:border-indigo-100 transition">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img src={buddy.img} className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-slate-100" alt={buddy.name} />
                  <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[8px] font-black w-10 h-10 flex items-center justify-center rounded-full border-4 border-white shadow-lg">
                    {getMatchScore(buddy)}%
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-lg leading-tight">{buddy.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{buddy.hobby}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter">{buddy.dist} away</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-black uppercase mt-2">{buddy.level} intensity</p>
                </div>
              </div>
              <button className="bg-slate-800 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition shadow-lg">Chat</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FindBuddy;
