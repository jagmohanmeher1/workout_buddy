
import React, { useState } from 'react';
import { WorkoutSession, WorkoutType, FitnessLevel } from '../types';

interface CreateWorkoutProps {
  onCreate: (session: Partial<WorkoutSession>) => void;
  onCancel: () => void;
  userLocation: {lat: number, lng: number} | null;
}

const WORKOUT_TYPES: WorkoutType[] = ['Gym', 'Running', 'Yoga', 'Swimming', 'Cycling', 'Hiking', 'Tennis', 'Basketball', 'CrossFit'];
const LEVELS: FitnessLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ onCreate, onCancel, userLocation }) => {
  const [type, setType] = useState<WorkoutType>('Gym');
  const [level, setLevel] = useState<FitnessLevel>('Intermediate');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [time, setTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      type,
      level,
      title,
      description,
      locationName,
      startTime: time ? new Date(time).toISOString() : new Date().toISOString(),
      maxParticipants
    });
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 border border-indigo-50 mb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Post a Session</h2>
          <p className="text-sm text-slate-400 font-medium">Find workout buddies in your area</p>
        </div>
        <button onClick={onCancel} className="bg-slate-50 p-2 rounded-full text-slate-400 hover:text-slate-600 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">1. Activity Type</label>
          <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
            {WORKOUT_TYPES.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border-2 transition-all ${
                  type === t ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">2. Target Intensity</label>
            <div className="flex space-x-2">
              {LEVELS.map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                    level === l ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-400 border-slate-100'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">3. Date & Time</label>
            <input 
              type="datetime-local" 
              required
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 outline-none text-sm font-bold text-slate-700"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest">4. Session Details</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Give it a punchy title (e.g. Legs & Lungs)"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 outline-none text-sm font-bold placeholder:text-slate-300"
          />
          <textarea 
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What should buddies expect? Equipment needed? Meeting point?"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 outline-none text-sm font-bold placeholder:text-slate-300 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">5. Meeting Location</label>
            <input 
              type="text" 
              required
              value={locationName}
              onChange={e => setLocationName(e.target.value)}
              placeholder="Gym name or Park location"
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 outline-none text-sm font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">6. Max Buddies</label>
            <input 
              type="number" 
              min="1"
              max="20"
              value={maxParticipants}
              onChange={e => setMaxParticipants(parseInt(e.target.value))}
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 outline-none text-sm font-bold"
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition transform active:scale-[0.98]"
          >
            Launch Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkout;
