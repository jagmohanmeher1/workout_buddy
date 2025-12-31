
import React, { useState, useEffect } from 'react';
import { getRecommendedGyms } from '../services/geminiService';
import { WorkoutType } from '../types';

interface FindBuddyProps {
  userLocation: {lat: number, lng: number} | null;
}

const FindBuddy: React.FC<FindBuddyProps> = ({ userLocation }) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{text: string, grounding: any[]}>({ text: '', grounding: [] });
  const [selectedType, setSelectedType] = useState<WorkoutType>('Gym');

  const handleSearch = async () => {
    if (!userLocation) return;
    setLoading(true);
    const results = await getRecommendedGyms(userLocation.lat, userLocation.lng, selectedType);
    setRecommendations(results);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Find Your Tribe</h2>
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <p className="text-gray-600 mb-4 font-medium">What are you looking for today?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {['Gym', 'Running', 'Yoga', 'Tennis'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type as WorkoutType)}
              className={`p-4 rounded-2xl border-2 transition text-center ${
                selectedType === type ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 text-gray-500'
              }`}
            >
              <div className="font-bold">{type}</div>
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleSearch}
          disabled={loading || !userLocation}
          className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-bold disabled:opacity-50"
        >
          {loading ? 'Consulting Gemini...' : 'Find Spots & People'}
        </button>
        {!userLocation && <p className="text-red-500 text-xs mt-2 text-center">Location access needed for better results.</p>}
      </div>

      {recommendations.text && (
        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 animate-in fade-in duration-500">
          <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            AI Insight
          </h3>
          <div className="prose text-indigo-800 text-sm leading-relaxed">
            {recommendations.text}
          </div>
          
          {recommendations.grounding.length > 0 && (
            <div className="mt-4 pt-4 border-t border-indigo-200">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Sources & Locations</h4>
              <div className="flex flex-wrap gap-2">
                {recommendations.grounding.map((chunk, idx) => chunk.maps && (
                  <a 
                    key={idx} 
                    href={chunk.maps.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 border border-indigo-200 hover:bg-indigo-600 hover:text-white transition"
                  >
                    {chunk.maps.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggested Buddies (Mocked) */}
      <section>
        <h3 className="font-bold text-gray-800 mb-4">Active People Nearby</h3>
        <div className="space-y-3">
          {[
            { name: 'Jordan', hobby: 'Running', dist: '0.5 mi', img: 'https://picsum.photos/seed/jordan/100' },
            { name: 'Casey', hobby: 'Weightlifting', dist: '1.2 mi', img: 'https://picsum.photos/seed/casey/100' },
            { name: 'Riley', hobby: 'Yoga', dist: '0.8 mi', img: 'https://picsum.photos/seed/riley/100' }
          ].map(buddy => (
            <div key={buddy.name} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <img src={buddy.img} className="w-12 h-12 rounded-full" alt={buddy.name} />
                <div>
                  <h4 className="font-bold">{buddy.name}</h4>
                  <p className="text-xs text-gray-500">{buddy.hobby} • {buddy.dist} away</p>
                </div>
              </div>
              <button className="text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-xl">Chat</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FindBuddy;
