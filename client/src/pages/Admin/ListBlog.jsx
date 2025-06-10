import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

const ListBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const { value } = useAppContext();
    const { axios,user } = value;
    const role = user?.role || 'user';

    const fetchBlogs = async (axios) => {
        const { data } = await axios.get('/api/admin/blogs');
        if (!data.success) throw new Error(data.message);
        return data.blogs;
    };

    const {
        data: blogsData = [],
        isLoading: blogsLoading,
        error: blogsError,
        refetch: refetchBlogs
    } = useQuery({
        queryKey: ['adminBlogs'],
        queryFn: () => fetchBlogs(axios),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10
    });

    if (blogsLoading) return <div>Loading...</div>;
    if (blogsError) return <div className="text-red-400">{blogsError.message}</div>;

    return (
        <div className="ml-64 min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-10 drop-shadow-lg">All Blogs</h1>
            <div className='relative max-w-4xl overflow-x-auto shadow-2xl rounded-2xl scrollbar-hide bg-white/10 backdrop-blur-md border border-white/20'>
                <table className='w-full text-sm text-zinc-200'>
                    <thead className='text-xs text-zinc-300 text-left uppercase bg-white/5'>
                        <tr>
                            <th scope='col' className='px-4 py-4 xl:px-6'>#</th>
                            <th scope='col' className='px-4 py-4'>Blog Title</th>
                            <th scope='col' className='px-4 py-4 max-sm:hidden'>Date</th>
                            <th scope='col' className='px-4 py-4 max-sm:hidden'>Status</th>
                            <th scope='col' className='px-4 py-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogsData.map((blog, index) => {
                            return (
                                <BlogTableItem
                                    key={blog._id}
                                    blog={blog}
                                    refetchBlogs={refetchBlogs}
                                    index={index + 1}
                                    role={role}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListBlog