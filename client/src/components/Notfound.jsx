import React from 'react'

const Notfound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-12 flex flex-col items-center gap-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-pink-400 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 text-center">404</h1>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2 text-center">Page Not Found</h2>
        <p className="text-zinc-300 text-center mb-6 max-w-md">Sorry, the page or content you are looking for does not exist, was removed, or is temporarily unavailable.</p>
        <a href="/" className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">Go Home</a>
      </div>
    </div>
  )
}

export default Notfound