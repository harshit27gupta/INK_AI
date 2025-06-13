import React, { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-12 pb-4 px-4 sm:px-8 lg:px-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
        {/* Brand Section */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">InkAI</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-300 max-w-md">
            InkAI is your intelligent blogging companion. Write, share, and discover insightful content powered by AI. Join our community to explore, create, and connect.
          </p>
        </div>

        {/* Navigation and Social Links */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 flex-1">
          {/* Navigation */}
          <div>
            <h3 className="font-bold mb-3 text-zinc-800 dark:text-zinc-100">Navigation</h3>
            <ul className="space-y-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
              <li><a href="/" className="hover:underline focus:underline" aria-label="Home">Home</a></li>
              <li><a href="/about" className="hover:underline focus:underline" aria-label="About">About</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="min-w-[180px] sm:ml-16 lg:ml-32">
            <h3 className="font-bold mb-3 text-zinc-800 dark:text-zinc-100">Connect with me</h3>
            <ul className="flex gap-4 mt-2" aria-label="Social links">
              <li>
                <a 
                  href="https://instagram.com/harshitraj6133" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram" 
                  className="hover:opacity-80 focus:opacity-80 transition-opacity"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-500">
                    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/>
                    <circle cx="18" cy="6" r="1" fill="currentColor"/>
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/harshit-27gupta/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn" 
                  className="hover:opacity-80 focus:opacity-80 transition-opacity"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-600">
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/>
                    <path d="M7 10v7" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
                    <path d="M10 13c0-1.1.9-2 2-2s2 .9 2 2v4" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 13v4" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          © {currentYear} InkAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;