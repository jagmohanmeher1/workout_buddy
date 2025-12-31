
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-sm text-center border border-gray-100">
        <div className="relative inline-block mb-4">
          <img src={user.avatar} className="w-32 h-32 rounded-full border-4 border-indigo-50 shadow-xl mx-auto" alt={user.name} />
          <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 mt-1">{user.bio}</p>
        
        <div className="flex justify-center space-x-8 mt-8">
          <div>
            <div className="text-2xl font-bold text-gray-800">24</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sessions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Buddies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">4.9</div>
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Rating</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map(interest => (
            <span key={interest} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100">
              {interest}
            </span>
          ))}
          <button className="border-2 border-dashed border-gray-200 text-gray-400 px-4 py-2 rounded-xl text-sm font-bold hover:border-indigo-200 hover:text-indigo-400 transition">
            + Add Interest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-3 text-sm">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <p className="font-bold text-gray-700">Completed Yoga Session</p>
                  <p className="text-gray-400">3 days ago with Sarah</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-1">Weekly Goal</h3>
          <p className="text-gray-500 text-sm mb-4">4 of 5 workouts done!</p>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full w-[80%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
