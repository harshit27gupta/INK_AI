import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
const Navbar = () => {
 const { value } = useAppContext();
 const { navigate, token,user } = value;
 const role = user?.role || 'user';
return (
  <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
    <span 
      onClick={() => navigate('/')} 
      className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer select-text"
    >
      InkAI
    </span>
    
    <button   
      onClick={() => token ? role === 'admin' ? navigate('/admin') : navigate('/user') : navigate('/role-choice')} 
      className='relative flex items-center gap-2 rounded-full text-sm cursor-pointer px-8 py-2.5 font-semibold shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-in-out hover:from-pink-500 hover:to-indigo-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400'
    >
      {token?"Dashboard":"Login"}
      <img src={assets.arrow} className='w-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110' alt="arrow" />
    </button>
  </div>
)
};
export default Navbar;

