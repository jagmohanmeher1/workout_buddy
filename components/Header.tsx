
import React from 'react';

interface HeaderProps {
  setView: (view: 'home' | 'create' | 'buddy' | 'map' | 'profile') => void;
  activeView: string;
}

const Header: React.FC<HeaderProps> = ({ setView, activeView }) => {
  return (
    <header className="bg-indigo-700 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
          <div className="bg-white text-indigo-700 p-1.5 rounded-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">WorkoutBuddy</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <button onClick={() => setView('home')} className={`hover:text-indigo-200 transition ${activeView === 'home' ? 'text-white border-b-2 border-white' : 'text-indigo-100'}`}>Feed</button>
          <button onClick={() => setView('map')} className={`hover:text-indigo-200 transition ${activeView === 'map' ? 'text-white border-b-2 border-white' : 'text-indigo-100'}`}>Explore</button>
          <button onClick={() => setView('buddy')} className={`hover:text-indigo-200 transition ${activeView === 'buddy' ? 'text-white border-b-2 border-white' : 'text-indigo-100'}`}>Find Buddy</button>
          <button onClick={() => setView('profile')} className={`hover:text-indigo-200 transition ${activeView === 'profile' ? 'text-white border-b-2 border-white' : 'text-indigo-100'}`}>Profile</button>
        </nav>

        <button 
          onClick={() => setView('create')}
          className="bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-indigo-50 transition hidden md:block"
        >
          Post Workout
        </button>
      </div>
    </header>
  );
};

export default Header;
