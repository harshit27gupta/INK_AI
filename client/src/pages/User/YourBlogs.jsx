import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
import BlogCard from '../../components/BlogCard'
import { useQuery } from '@tanstack/react-query'

const YourBlogs = () => {
  const { value } = useAppContext();
  const { axios, user } = value;
  const [blogs, setBlogs] = useState([]);

  const fetchYourBlogs = async (axios) => {
    const { data } = await axios.get('/api/user/yourblogs');
    if (!data.success) throw new Error(data.message);
    return data.blogs;
  };

  const {
    data: blogsData = [],
    isLoading: blogsLoading,
    error: blogsError,
    refetch: refetchYourBlogs
  } = useQuery({
    queryKey: ['yourBlogs'],
    queryFn: () => fetchYourBlogs(axios),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
      enabled: !!user
  });

  if (blogsLoading) return <div>Loading...</div>;
  if (blogsError) return <div className="text-red-400">{blogsError.message}</div>;

  return (
    <div className="ml-64 min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-10 drop-shadow-lg">Your Blogs</h1>
      {blogsData.length === 0 ? (
        <div className="text-zinc-200 text-lg">You have not written any blogs yet.</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 ml-0'>
          {blogsData.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default YourBlogs