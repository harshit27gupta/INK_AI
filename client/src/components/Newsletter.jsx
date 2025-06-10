import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../Context/AppContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { value } = useAppContext();
  const { axios } = value;
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await axios.post('/api/newsletter/subscribe', { email });
      if (data.success) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };
  return (
    <div className="w-full flex justify-center py-20 px-4 mt-20">
      <div className="max-w-xl w-full bg-white/80 dark:bg-zinc-900/80 rounded-3xl shadow-xl p-8 border-2 border-transparent">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Never miss a blog!
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-300 mb-6">
          Subscribe to our newsletter to get the latest news and updates.
        </p>
        <form className="flex flex-col sm:flex-row items-center gap-3 mt-2" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 p-3 rounded-full border border-indigo-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400"
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Newsletter