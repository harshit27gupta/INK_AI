import React, { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pt-12 pb-4 px-4 md:px-8 lg:px-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        <div className="flex-1 min-w-[220px] flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            {/* <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">I</span> */}
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">InkAI</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-300 max-w-md">
            InkAI is your intelligent blogging companion. Write, share, and discover insightful content powered by AI. Join our community to explore, create, and connect.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-8 flex-1">
          <div>
            <h3 className="font-bold mb-2 text-zinc-800 dark:text-zinc-100">Navigation</h3>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-300">
              <li><a href="/" className="hover:underline focus:underline" aria-label="Home">Home</a></li>
              <li><a href="/about" className="hover:underline focus:underline" aria-label="About">About</a></li>
            </ul>
          </div>
          <div className="min-w-[180px] ml-auto md:ml-16 lg:ml-32">
            <h3 className="font-bold mb-2 text-zinc-800 dark:text-zinc-100">Connect with me</h3>
            <ul className="flex gap-4 mt-2" aria-label="Social links">
              <li>
                <a href="https://instagram.com/harshitraj6133" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 focus:opacity-80">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-500"><circle cx="12" cy="12" r="4" strokeWidth="2"/><rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/harshit-27gupta/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 focus:opacity-80">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-600"><rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/><path d="M7 10v7" strokeWidth="2" strokeLinecap="round"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/><path d="M10 13c0-1.1.9-2 2-2s2 .9 2 2v4" strokeWidth="2" strokeLinecap="round"/><path d="M14 13v4" strokeWidth="2" strokeLinecap="round"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-8 border-zinc-200 dark:border-zinc-800" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center text-zinc-500 dark:text-zinc-400 text-sm">
        <div>
          &copy; {currentYear} InkAI. All rights reserved.
        </div>
        <div>
          Made with <span className="text-pink-500 text-lg" role="img" aria-label="love">♥</span> by <span className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Harshit Gupta</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer