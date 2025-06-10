import React from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'  
const BlogTableItem = ({blog,index,refetchBlogs,role}) =>{
const {title,createdAt}=blog;
const BlogDate=new Date(createdAt);
const { value } = useAppContext();
const { axios } = value;
const deleteBlog=async()=>{
  const confirm=window.confirm("Are you sure you want to delete this blog?");
  if(!confirm) return;
  try{
    const {data}=await axios.post(`/api/blog/delete`,{blog_id:blog._id});
    if(data.success){
      toast.success(data.message);
      await refetchBlogs();
    }
    else{
      toast.error(data.message);
    }
  }catch(error){
    toast.error(error.message);
  }
}
const togglePublish=async()=>{
  try{
    const {data}=await axios.post(`/api/blog/toggle-publish`,{blog_id:blog._id});
    if(data.success){
      toast.success(data.message);
      await refetchBlogs();
    }
    else{
      toast.error(data.message);
    }
  }catch(error){
    toast.error(error.message);
  }
}
  return (
    <tr className='border-y border-white/10 hover:bg-white/5 transition-all'>
      <th className='px-4 py-4 font-semibold text-zinc-100'>{index}</th>
      <td className='px-4 py-4'>{title}</td>
      <td className='px-4 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
      <td className='px-4 py-4 max-sm:hidden'>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${blog.isPublished ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}>
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </span>
      </td>
      {role === 'admin' && (
      <td className='px-4 py-4 flex text-xs gap-3'>
        <button onClick={togglePublish} className='px-3 py-1 rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow hover:scale-105 transition-all'>
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>
            <svg
              onClick={deleteBlog}
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 cursor-pointer mt-2 transition-transform hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#bin-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id="bin-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="0.5" stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <rect x="3" y="6" width="18" height="14" rx="2" stroke="url(#bin-gradient)" strokeWidth="2" fill="none" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="url(#bin-gradient)" />
              <line x1="1" y1="6" x2="23" y2="6" stroke="url(#bin-gradient)" />
              <line x1="10" y1="11" x2="10" y2="17" stroke="url(#bin-gradient)" />
              <line x1="14" y1="11" x2="14" y2="17" stroke="url(#bin-gradient)" />
            </svg>
      </td>
      )}
    </tr>  
  )
}

export default BlogTableItem