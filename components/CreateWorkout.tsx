
import React, { useState } from 'react';
import { WorkoutSession, WorkoutType } from '../types';

interface CreateWorkoutProps {
  onCreate: (session: Partial<WorkoutSession>) => void;
  onCancel: () => void;
  userLocation: {lat: number, lng: number} | null;
}

const WORKOUT_TYPES: WorkoutType[] = ['Gym', 'Running', 'Yoga', 'Swimming', 'Cycling', 'Hiking', 'Tennis', 'Basketball', 'CrossFit'];

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ onCreate, onCancel, userLocation }) => {
  const [type, setType] = useState<WorkoutType>('Gym');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [time, setTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      type,
      title,
      description,
      locationName,
      startTime: time ? new Date(time).toISOString() : new Date().toISOString(),
      maxParticipants
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">New Session</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Activity Type</label>
          <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
            {WORKOUT_TYPES.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition ${
                  type === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Session Title</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., Early Morning HIIT Session"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Location / Gym Name</label>
          <input 
            type="text" 
            required
            value={locationName}
            onChange={e => setLocationName(e.target.value)}
            placeholder="Search for a gym or park..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Date & Time</label>
            <input 
              type="datetime-local" 
              required
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Max Buddies</label>
            <input 
              type="number" 
              min="1"
              max="20"
              value={maxParticipants}
              onChange={e => setMaxParticipants(parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Details (Optional)</label>
          <textarea 
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Anything buddies should know? e.g., Beginner friendly!"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition transform active:scale-95"
        >
          Publish Session
        </button>
      </form>
    </div>
  );
};

export default CreateWorkout;
