import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';

const UserLogin = () => {
  const navigate = useNavigate();
  const { value } = useAppContext();
  const { axios, setToken, setUser, user, loading } = value;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Check for existing session
  useEffect(() => {
    if (!loading) {  // Wait for AppContext to finish loading
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.role === 'user') {
            toast.success("Welcome back!");
            navigate('/user');
          }
        } catch (error) {
          console.error('Error parsing stored user:', error);
        }
      }
    }
  }, [loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading1(true);
    setError('');
    try {
      const { data } = await axios.post('/api/user/login', { email, password });
      if (data.success) {
        setToken(data.token);
        setUser({ ...data.user, role: 'user' });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ ...data.user, role: 'user' }));
        axios.defaults.headers.common['Authorization'] = data.token;
        toast.success(data.message);
        navigate('/user');
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      const backendMsg = err.response?.data?.message;
      setError(backendMsg || err.message);
      toast.error(backendMsg || err.message);
    }
    setLoading1(false);
  };

  // Show loading state while AppContext is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 flex flex-col gap-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 text-center">User Login</h1>
        <p className="text-center text-zinc-200 mb-4">Login to your account to access personalized features.</p>
        {error && <div className="text-red-400 text-center">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all w-full pr-10"
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black hover:text-indigo-400"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001c2.29 4.019 6.686 6.999 10.066 6.999 3.38 0 7.776-2.98 10.066-6.999a10.477 10.477 0 00-2.046-3.778M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .512-.13.995-.354 1.412M6.53 6.53A9.956 9.956 0 003.98 8.223m0 0A10.477 10.477 0 001.934 12.001c2.29 4.019 6.686 6.999 10.066 6.999 1.676 0 3.37-.497 4.899-1.357M3.98 8.223l12.02 12.02" />
              </svg>
            )}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading1}
          className="w-full py-3 font-bold rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {loading1 ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center text-zinc-300 mt-2">
          Not registered?{' '}
          <span className="text-indigo-400 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/register')}>
            Register here
          </span>
        </div>
      </form>
    </div>
  );
};

export default UserLogin; 