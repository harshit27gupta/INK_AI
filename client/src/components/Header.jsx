import React, { useRef } from 'react'
import { useAppContext } from '../Context/AppContext'

const Header = () => {
  const { value } = useAppContext();
  const { input, setInput } = value;
  const inputRef = useRef();
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value); 
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-12 sm:mt-20 mb-8 relative animate-fade-in px-4">
      <div className="w-full max-w-2xl text-center mb-6 sm:mb-10">
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-indigo-300 mb-2">AI POWERED BLOGGING PLATFORM</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-lg">
          Create Stunning Blogs with AI
        </h1>
        <p className="text-base sm:text-lg text-zinc-200 font-medium px-2">
          Generate blogs and get your comments approved with <span className="text-indigo-400 font-semibold">AI-powered</span> moderation.
        </p>
      </div>
      <form onSubmit={handleSearch} className="w-full max-w-2xl flex items-center bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl px-3 sm:px-4 py-2 sm:py-3 mb-8 border border-white/20">
        <input
          type="text"
          placeholder="Search blog topics..."
          className="flex-1 bg-transparent outline-none text-zinc-100 placeholder-zinc-400 px-2 py-1 sm:py-2 text-base sm:text-lg"
          value={input}
          ref={inputRef}
          onChange={handleInputChange}
        />
        <button 
          type="submit" 
          className="ml-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm sm:text-base font-semibold shadow transition-all duration-300 hover:from-pink-500 hover:to-indigo-500 hover:scale-105"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Header