import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { value} = useAppContext();
  const { axios, setToken,setUser } = value;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/user/register', { name, email, password });
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
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 flex flex-col gap-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 text-center">Register</h1>
        <p className="text-center text-zinc-200 mb-4">Create your account to get started.</p>
        {error && <div className="text-red-400 text-center">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-bold rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="text-center text-zinc-300 mt-2">
          Already have an account?{' '}
          <span className="text-indigo-400 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/user-login')}>
            Login here
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register; 