import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../Context/AppContext'
const Layout = () => {
    const { value } = useAppContext();
    const { axios,setToken,navigate,setUser } = value;
    const [loading, setLoading] = useState(false);
    const logout=()=>{
      if (!window.confirm('Are you sure you want to log out?')) return;
      setLoading(true);
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization']=null;
        setToken(null);
        setUser(null);
        setLoading(false);
        navigate('/');
      }, 2000);
    }
    
    return (
        <>
         {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
            <span className="inline-block w-10 h-10 border-4 border-t-transparent border-indigo-400 border-r-purple-400 border-b-pink-400 border-l-indigo-400 rounded-full animate-spin"></span>
            <span className="sr-only">Loading...</span>
          </div>
        )}
         <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
    {/* Logo and Brand Name */}
    <div
      className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer select-text">
     </div>
            <button 
              onClick={logout} 
              className='text-sm px-8 py-2 rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md transition-all duration-200 hover:from-pink-500 hover:to-indigo-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400'>
              Logout
            </button>
          </div>
          <div>
            <div>
                <Sidebar/>
            </div>
            <Outlet/>
          </div>
        </>
      )      
}

export default Layout