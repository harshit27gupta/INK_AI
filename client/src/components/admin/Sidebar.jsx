import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../Context/AppContext'
const Sidebar = () => {
    const { value } = useAppContext();
    const { navigate, user } = value;
    const role = user?.role || 'user';
    const basePath = role === 'admin' ? '/admin' : '/user';
    return (
        <aside className="fixed top-0 cursor-pointer left-0 h-full w-64 bg-gradient-to-b from-indigo-800 via-purple-800 to-pink-800 flex flex-col pt-10 z-30">
            <span onClick={()=>navigate('/')} className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center mb-10 select-none">InkAI</span>
            <nav className="flex flex-col gap-2 px-2">
                <NavLink
                    end={true}
                    to={`${basePath}`}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 font-medium transition-all duration-200 relative rounded-lg cursor-pointer group overflow-hidden ${
                            isActive ?
                                'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg' :
                                'hover:bg-indigo-100/10 hover:text-indigo-300 text-zinc-200'
                        } hover:scale-[1.04] focus:scale-[1.04] active:scale-100`
                    }
                >
                    {({ isActive }) => <>
                        <img src={assets.home_icon} alt="" className={`w-5 h-5 transition-all duration-200 ${isActive ? 'text-white scale-110 filter brightness-200' : 'group-hover:text-indigo-300 group-hover:scale-110'}`} />
                        <span className={`transition-all duration-200 ${isActive ? 'font-bold' : ''}`}>Dashboard</span>
                    </>}
                </NavLink>
                <NavLink
                    end={true}
                    to={`${basePath}/addBlog`}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 font-medium transition-all duration-200 relative rounded-lg cursor-pointer group overflow-hidden ${
                            isActive ?
                                'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg' :
                                'hover:bg-indigo-100/10 hover:text-indigo-300 text-zinc-200'
                        } hover:scale-[1.04] focus:scale-[1.04] active:scale-100`
                    }
                >
                    {({ isActive }) => <>
                        <img src={assets.add_icon} alt="" className={`w-5 h-5 transition-all duration-200 ${isActive ? 'text-white scale-110 filter brightness-200' : 'group-hover:text-indigo-300 group-hover:scale-110'}`} />
                        <span className={`transition-all duration-200 ${isActive ? 'font-bold' : ''}`}>Add blogs</span>
                    </>}
                </NavLink>
                {role === 'admin' && (
                  <>
                    <NavLink
                      end={true}
                      to={`${basePath}/listBlog`}
                      className={({ isActive }) =>
                          `flex items-center gap-3 px-6 py-3 font-medium transition-all duration-200 relative rounded-lg cursor-pointer group overflow-hidden ${
                              isActive ?
                                  'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg' :
                                  'hover:bg-indigo-100/10 hover:text-indigo-300 text-zinc-200'
                          } hover:scale-[1.04] focus:scale-[1.04] active:scale-100`
                      }
                    >
                      {({ isActive }) => <>
                          <img src={assets.list_icon} alt="" className={`w-5 h-5 transition-all duration-200 ${isActive ? 'text-white scale-110 filter brightness-200' : 'group-hover:text-indigo-300 group-hover:scale-110'}`} />
                          <span className={`transition-all duration-200 ${isActive ? 'font-bold' : ''}`}>Blog lists</span>
                      </>}
                    </NavLink>
                    <NavLink
                      end={true}
                      to={`${basePath}/comments`}
                      className={({ isActive }) =>
                          `flex items-center gap-3 px-6 py-3 font-medium transition-all duration-200 relative rounded-lg cursor-pointer group overflow-hidden ${
                              isActive ?
                                  'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg' :
                                  'hover:bg-indigo-100/10 hover:text-indigo-300 text-zinc-200'
                          } hover:scale-[1.04] focus:scale-[1.04] active:scale-100`
                      }
                    >
                      {({ isActive }) => <>
                          <img src={assets.comment_icon} alt="" className={`w-5 h-5 transition-all duration-200 ${isActive ? 'text-white scale-110 filter brightness-200' : 'group-hover:text-indigo-300 group-hover:scale-110'}`} />
                          <span className={`transition-all duration-200 ${isActive ? 'font-bold' : ''}`}>Verify Messages</span>
                      </>}
                    </NavLink>
                  </>
                )}
                {role === 'user' && (
                  <NavLink
                    end={true}
                    to={`${basePath}/yourblogs`}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 font-medium transition-all duration-200 relative rounded-lg cursor-pointer group overflow-hidden ${
                            isActive ?
                                'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg' :
                                'hover:bg-indigo-100/10 hover:text-indigo-300 text-zinc-200'
                        } hover:scale-[1.04] focus:scale-[1.04] active:scale-100`
                    }
                  >
                    {({ isActive }) => <>
                        <img src={assets.list_icon} alt="" className={`w-5 h-5 transition-all duration-200 ${isActive ? 'text-white scale-110 filter brightness-200' : 'group-hover:text-indigo-300 group-hover:scale-110'}`} />
                        <span className={`transition-all duration-200 ${isActive ? 'font-bold' : ''}`}>Your Blogs</span>
                    </>}
                  </NavLink>
                )}
            </nav>
        </aside>
    )
}

export default Sidebar