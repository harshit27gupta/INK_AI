import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
    const { value } = useAppContext();
    const { axios, user } = value;
    const role = user?.role || 'user';

    const fetchDashboardData = async (axios, role) => {
        const { data } = await axios.get(`/api/${role}/dashboard`);
        if (!data.success) throw new Error(data.message);
        return data.dashboardData;
    };

    const {
        data: dashboardData = { blogs: 0, comments: 0, drafts: 0, recentBlogs: [], users: 0 },
        isLoading: dashboardLoading,
        error: dashboardError,
        refetch: refetchDashboard
    } = useQuery({
        queryKey: ['dashboard', role],
        queryFn: () => fetchDashboardData(axios, role),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        enabled: !!role
    });

    if (dashboardLoading) return <div>Loading...</div>;
    if (dashboardError) return <div className="text-red-400">{dashboardError.message}</div>;

    return (
        <div className="ml-64 min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-10 drop-shadow-lg">{role === 'admin' ? 'Admin ' : 'User '}Dashboard </h1>
            <div className='flex flex-wrap gap-6 mb-12'>
                <div className='flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 min-w-[200px] rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all border border-white/20'>
                    <img src={assets.dashboard_icon_1} alt="" className="w-12 h-12" />
                    <div>
                        <p className='text-2xl font-bold text-zinc-100'>{dashboardData.blogs}</p>
                        <p className='text-zinc-300 font-light'>Blogs</p>
                    </div>
                </div>
                {role === 'admin' && (
                  <>
                    <div className='flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 min-w-[200px] rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all border border-white/20'>
                        <img src={assets.dashboard_icon_2} alt="" className="w-12 h-12" />
                        <div>
                            <p className='text-2xl font-bold text-zinc-100'>{dashboardData.comments}</p>
                            <p className='text-zinc-300 font-light'>Comments</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 min-w-[200px] rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition-all border border-white/20'>
                        <img src={assets.dashboard_icon_3} alt="" className="w-12 h-12" />
                        <div>
                            <p className='text-2xl font-bold text-zinc-100'>{dashboardData.drafts}</p>
                            <p className='text-zinc-300 font-light'>Drafts</p>
                        </div>
                    </div>
                  </>
                )}
            </div>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <img src={assets.dashboard_icon_4} alt="" className="w-8 h-8" />
                    <p className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Latest Blogs</p>
                </div>
                <div className='relative max-w-4xl overflow-x-auto shadow-2xl rounded-2xl scrollbar-hide bg-white/10 backdrop-blur-md border border-white/20'>
                    <table className='w-full text-sm text-zinc-200'>
                        <thead className='text-xs text-zinc-300 text-left uppercase bg-white/5'>
                            <tr>
                                <th scope='col' className='px-4 py-4 xl:px-6'>#</th>
                                <th scope='col' className='px-4 py-4'>Blog Title</th>
                                <th scope='col' className='px-4 py-4 max-sm:hidden'>Date</th>
                               
                                  <th scope='col' className='px-4 py-4 max-sm:hidden'>Status</th>
                              
                                {role === 'admin' && (
                                  <th scope='col' className='px-4 py-4'>Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.map((blog, index) => {
                                return (
                                    <BlogTableItem
                                        key={blog._id}
                                        blog={blog}
                                        fetchBlogs={refetchDashboard}
                                        index={index + 1}
                                        role={role}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard