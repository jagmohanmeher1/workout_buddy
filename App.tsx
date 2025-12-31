
import React, { useState, useEffect } from 'react';
import { User, WorkoutSession, WorkoutType, FitnessLevel } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CreateWorkout from './components/CreateWorkout';
import FindBuddy from './components/FindBuddy';
import MapView from './components/MapView';
import Profile from './components/Profile';

const INITIAL_USER: User = {
  id: 'me',
  name: 'Alex Rivera',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  bio: 'Fitness enthusiast. Love HIIT and outdoor running.',
  interests: ['Gym', 'Running', 'CrossFit'],
  fitnessLevel: 'Intermediate'
};

const INITIAL_SESSIONS: WorkoutSession[] = [
  {
    id: '1',
    host: { id: '2', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', bio: '', interests: [], fitnessLevel: 'Advanced' },
    type: 'Yoga',
    level: 'Intermediate',
    title: 'Morning Flow in the Park',
    description: 'A gentle vinyasa flow to start the day. Bring your own mat!',
    locationName: 'Central Park North Meadow',
    coordinates: { lat: 40.793, lng: -73.958 },
    startTime: new Date(Date.now() + 3600000 * 2).toISOString(),
    participantCount: 3,
    maxParticipants: 10,
    joined: false
  },
  {
    id: '2',
    host: { id: '3', name: 'Mike Ross', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', bio: '', interests: [], fitnessLevel: 'Advanced' },
    type: 'Gym',
    level: 'Advanced',
    title: 'Heavy Leg Day Session',
    description: 'Looking for someone to spot me on squats and push each other.',
    locationName: 'Iron Paradise Gym',
    coordinates: { lat: 40.758, lng: -73.985 },
    startTime: new Date(Date.now() + 3600000 * 5).toISOString(),
    participantCount: 1,
    maxParticipants: 2,
    joined: false
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'create' | 'buddy' | 'map' | 'profile'>('home');
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [sessions, setSessions] = useState<WorkoutSession[]>(INITIAL_SESSIONS);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Location permission denied or unavailable", err)
      );
    }
  }, []);

  const handleJoinSession = (id: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, joined: !s.joined, participantCount: s.joined ? s.participantCount - 1 : s.participantCount + 1 };
      }
      return s;
    }));
  };

  const handleCreateSession = (newSession: Partial<WorkoutSession>) => {
    const session: WorkoutSession = {
      id: Math.random().toString(36).substr(2, 9),
      host: currentUser,
      type: newSession.type as WorkoutType,
      level: newSession.level as FitnessLevel || 'Intermediate',
      title: newSession.title || 'Workout',
      description: newSession.description || '',
      locationName: newSession.locationName || 'Local Spot',
      coordinates: newSession.coordinates || userLocation || { lat: 40.7128, lng: -74.0060 },
      startTime: newSession.startTime || new Date().toISOString(),
      participantCount: 1,
      maxParticipants: newSession.maxParticipants || 5,
      joined: true
    };
    setSessions([session, ...sessions]);
    setView('home');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Dashboard user={currentUser} sessions={sessions} onJoin={handleJoinSession} onCreateClick={() => setView('create')} />;
      case 'create':
        return <CreateWorkout onCreate={handleCreateSession} onCancel={() => setView('home')} userLocation={userLocation} />;
      case 'buddy':
        return <FindBuddy currentUser={currentUser} userLocation={userLocation} />;
      case 'map':
        return <MapView sessions={sessions} userLocation={userLocation} onJoin={handleJoinSession} />;
      case 'profile':
        return <Profile user={currentUser} onUpdate={handleUpdateProfile} />;
      default:
        return <Dashboard user={currentUser} sessions={sessions} onJoin={handleJoinSession} onCreateClick={() => setView('create')} />;
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-slate-50">
      <Header setView={setView} activeView={view} />
      <main className="max-w-4xl mx-auto px-4 pt-4">
        {renderView()}
      </main>
      
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden flex justify-around py-3 z-50">
        <button onClick={() => setView('home')} className={`flex flex-col items-center ${view === 'home' ? 'text-indigo-600' : 'text-gray-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="text-[10px] mt-1 font-medium">Feed</span>
        </button>
        <button onClick={() => setView('map')} className={`flex flex-col items-center ${view === 'map' ? 'text-indigo-600' : 'text-gray-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          <span className="text-[10px] mt-1 font-medium">Map</span>
        </button>
        <button onClick={() => setView('create')} className="flex flex-col items-center -mt-6">
          <div className="bg-indigo-600 text-white p-3 rounded-full shadow-lg border-4 border-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </div>
          <span className="text-[10px] mt-1 font-medium text-gray-500">Post</span>
        </button>
        <button onClick={() => setView('buddy')} className={`flex flex-col items-center ${view === 'buddy' ? 'text-indigo-600' : 'text-gray-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span className="text-[10px] mt-1 font-medium">Matching</span>
        </button>
        <button onClick={() => setView('profile')} className={`flex flex-col items-center ${view === 'profile' ? 'text-indigo-600' : 'text-gray-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span className="text-[10px] mt-1 font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
