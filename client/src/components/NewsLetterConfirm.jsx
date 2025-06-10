import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';

const NewsletterConfirm = () => {
  const { token } = useParams();
  const { value } = useAppContext();
  const { axios } = value;
  const [message, setMessage] = useState('Confirming your subscription...');

  useEffect(() => {
    const confirm = async () => {
      try {
        const res = await axios.get(`/api/newsletter/confirm/${token}`);
        setMessage(res.data || 'Subscription confirmed!');
      } catch {
        setMessage('Invalid or expired confirmation link.');
      }
    };
    confirm();
  }, [token, axios]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 flex flex-col gap-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-zinc-100 mb-4">Newsletter Subscription</h1>
        <p className="text-lg text-zinc-200">{message}</p>
      </div>
    </div>
  );
};

export default NewsletterConfirm;