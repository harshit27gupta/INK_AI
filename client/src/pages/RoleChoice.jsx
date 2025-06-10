import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleChoice = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-12 flex flex-col items-center gap-10 mt-8 w-full max-w-lg">
        <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 text-center whitespace-nowrap">Choose Login Type</h1>
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
          <button
            onClick={() => navigate('/admin')}
            className="px-12 py-6 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-2xl font-bold shadow-lg hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all w-full sm:w-auto"
          >
            Login as Admin
          </button>
          <button
            onClick={() => navigate('/user-login')}
            className="px-12 py-6 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-2xl font-bold shadow-lg hover:from-indigo-500 hover:to-pink-500 hover:scale-105 transition-all w-full sm:w-auto"
          >
            Login as User
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleChoice; 