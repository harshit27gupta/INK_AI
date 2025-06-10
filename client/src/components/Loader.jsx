import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound = ({ message = 'Sorry, the page you are looking for was not found.', actionText = 'Go Home', onAction }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4">
      {/* Icon or Illustration */}
      <div className="mb-8">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="56" fill="url(#paint0_radial_404)" />
          <ellipse cx="60" cy="80" rx="28" ry="8" fill="#fff" fillOpacity=".08" />
          <path d="M45 55a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm44 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM48 75c2.5 3 7.5 5 12 5s9.5-2 12-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <radialGradient id="paint0_radial_404" cx="0" cy="0" r="1" gradientTransform="rotate(90 0 60) scale(60)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A5B4FC"/>
              <stop offset="0.5" stopColor="#C084FC"/>
              <stop offset="1" stopColor="#F472B6"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      {/* 404 Gradient Title */}
      <h1 className="text-7xl sm:text-8xl font-extrabold bg-gradient-to-r from-[#A5B4FC] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent mb-4 drop-shadow-lg">404</h1>
      {/* Message */}
      <p className="text-2xl sm:text-3xl text-zinc-100 font-semibold mb-4 text-center max-w-xl">{message}</p>
      {/* Home Button */}
      <button
        className="mt-4 px-8 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white shadow-lg hover:from-pink-400 hover:to-indigo-400 transition-all"
        onClick={onAction || (() => navigate('/'))}
      >
        {actionText}
      </button>
    </div>
  );
};

const Loader = () => {
  const [show, setShow] = useState(false);
  const [longWait, setLongWait] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setShow(true), 300); 
    const timeout = setTimeout(() => setLongWait(true), 8000);
    const notFoundTimeout = setTimeout(() => setNotFound(true), 15000); 
    return () => {
      clearTimeout(delay);
      clearTimeout(timeout);
      clearTimeout(notFoundTimeout);
    };
  }, []);

  if (!show) return null;
  if (notFound) return <NotFound />;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-transparent"
      aria-busy="true"
      role="status"
    >
      <span className="relative flex h-24 w-24">
        <span className="animate-spin inline-flex h-full w-full rounded-full" style={{ background: 'conic-gradient(from 0deg, #6366f1, #a78bfa, #ec4899, #6366f1 80%)' }}>
          <span className="absolute inset-2 rounded-full bg-transparent"></span>
        </span>
      </span>
      <span className="mt-6 text-zinc-300 text-2xl font-semibold">Loading...</span>
      <span className="sr-only">Loading, please wait</span>
      {longWait && (
        <span className="mt-4 text-pink-400 text-base font-medium animate-pulse">Still loading, please wait…</span>
      )}
    </div>
  )
}

export default Loader
