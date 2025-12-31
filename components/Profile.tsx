
import React, { useState } from 'react';
import { User, WorkoutType, FitnessLevel } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const WORKOUT_TYPES: WorkoutType[] = ['Gym', 'Running', 'Yoga', 'Swimming', 'Cycling', 'Hiking', 'Tennis', 'Basketball', 'CrossFit'];
const LEVELS: FitnessLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const toggleInterest = (interest: WorkoutType) => {
    const updated = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: updated });
  };

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2rem] p-8 shadow-xl text-center border border-indigo-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-athletic"></div>
        
        <div className="relative z-10">
          <div className="relative inline-block mb-4 mt-8">
            <img src={user.avatar} className="w-32 h-32 rounded-full border-8 border-white shadow-2xl mx-auto bg-white" alt={user.name} />
            <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg"></div>
          </div>
          
          {!isEditing ? (
            <>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{user.name}</h2>
              <div className="flex justify-center mt-2">
                <span className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100">
                  {user.fitnessLevel}
                </span>
              </div>
              <p className="text-slate-500 mt-4 max-w-sm mx-auto font-medium italic">"{user.bio}"</p>
              
              <button 
                onClick={() => setIsEditing(true)}
                className="mt-6 px-8 py-2.5 rounded-2xl bg-slate-800 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition shadow-lg"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className="space-y-4 max-w-md mx-auto mt-6">
              <input 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-indigo-600 transition"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Full Name"
              />
              <textarea 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-indigo-600 transition resize-none"
                rows={3}
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
                placeholder="Short bio about your fitness journey"
              />
              <div className="flex space-x-2">
                {LEVELS.map(l => (
                  <button
                    key={l}
                    onClick={() => setFormData({...formData, fitnessLevel: l})}
                    className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                      formData.fitnessLevel === l ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-100'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2 pt-2">
                <button 
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-2xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-indigo-50">
        <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-6">Preferred Activities</h3>
        <div className="flex flex-wrap gap-2">
          {WORKOUT_TYPES.map(interest => (
            <button
              key={interest}
              onClick={() => isEditing && toggleInterest(interest)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border-2 ${
                formData.interests.includes(interest)
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
                  : 'bg-white text-slate-300 border-slate-50 opacity-60'
              } ${isEditing ? 'cursor-pointer hover:border-indigo-400' : 'cursor-default'}`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-indigo-50">
          <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-6">Recent History</h3>
          <div className="space-y-6">
            {[
              { type: 'Yoga', date: '3 days ago', with: 'Sarah' },
              { type: 'Running', date: '5 days ago', with: 'Self' },
              { type: 'Gym', date: '1 week ago', with: 'Mike' }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm">{item.type} Session</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{item.date} • with {item.with}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-600 rounded-[2rem] p-8 shadow-xl text-white flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-white/20 text-white rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl backdrop-blur-sm">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          </div>
          <h3 className="text-xl font-black mb-2">Weekly Goal</h3>
          <p className="text-indigo-100 text-sm font-bold mb-6">4 of 5 workouts crushed! 🔥</p>
          <div className="w-full bg-indigo-900/30 h-3 rounded-full overflow-hidden mb-2">
            <div className="bg-white h-full w-[80%] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Keep going, Alex!</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
