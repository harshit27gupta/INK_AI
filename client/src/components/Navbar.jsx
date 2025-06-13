import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import { useState } from 'react'

const Navbar = () => {
  const { value } = useAppContext();
  const { navigate, token, user } = value;
  const role = user?.role || 'user';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='relative'>
      <div className='flex justify-between items-center py-5 mx-4 sm:mx-8 md:mx-20 xl:mx-32'>
        <span 
          onClick={() => navigate('/')} 
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer select-text"
        >
          InkAI
        </span>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 rounded-lg hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          <button   
            onClick={() => token ? role === 'admin' ? navigate('/admin') : navigate('/user') : navigate('/role-choice')} 
            className='relative flex items-center gap-2 rounded-full text-sm cursor-pointer px-8 py-2.5 font-semibold shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-in-out hover:from-pink-500 hover:to-indigo-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400'
          >
            {token ? "Dashboard" : "Login"}
            <img src={assets.arrow} className='w-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110' alt="arrow" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-indigo-800/95 to-purple-900/95 backdrop-blur-md z-50 border-t border-white/10">
          <div className="flex flex-col p-4 space-y-4">
            <button   
              onClick={() => {
                token ? role === 'admin' ? navigate('/admin') : navigate('/user') : navigate('/role-choice');
                setIsMenuOpen(false);
              }} 
              className='w-full flex items-center justify-center gap-2 rounded-full text-sm cursor-pointer px-8 py-3 font-semibold shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-in-out hover:from-pink-500 hover:to-indigo-500'
            >
              {token ? "Dashboard" : "Login"}
              <img src={assets.arrow} className='w-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110' alt="arrow" />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
};

export default Navbar;

