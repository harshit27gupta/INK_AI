import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const CommentTableItem = ({comment,fetchComments,index}) =>{
const {blog,createdAt,_id}=comment;
const BlogDate=new Date(createdAt);
const { value } = useAppContext();
const { axios } = value;
const approveComment=async()=>{
  try{
    const {data}=await axios.post(`/api/admin/approve-comment`,{id:_id});
    if(data.success){
      toast.success(data.message);
      await fetchComments();
    }
    else{
      toast.error(data.message);
    }
  
  }catch(error){
    toast.error(error.message);
  }
}
const deleteComment=async()=>{
  const confirm=window.confirm("Are you sure you want to delete this comment?");
  if(!confirm) return;
  try{
    const {data}=await axios.post(`/api/admin/delete-comment`,{id:_id});
    if(data.success){
      toast.success(data.message);
      await fetchComments();
    }
    else{
      toast.error(data.message);
    }
    await fetchComments();
  }catch(error){
    toast.error(error.message);
  }
}
return (
    <tr className='border-y border-white/10 hover:bg-white/5 transition-all'>
      <td className='px-4 py-6 text-zinc-100 align-middle'>
        <b className='font-semibold text-indigo-300'>Blog</b> : <span className='font-medium text-zinc-100'>{blog.title}</span>
        <br/>
        <b className='font-semibold text-indigo-300'>Name</b> : <span className='font-medium text-zinc-100'>{comment.name}</span>
        <br/>
        <b className='font-semibold text-indigo-300'>Comment</b> : <span className='text-zinc-200'>{comment.content}</span>
      </td>
      <td className='px-4 py-6 max-sm:hidden text-zinc-300 align-middle'>
        {BlogDate.toLocaleDateString()}
      </td>
      <td className='px-4 py-6 align-middle'>
        <div className='flex gap-3 items-center justify-center mt-2'>
            {!comment.isApproved ?
                <button onClick={approveComment} className='flex items-center gap-1 px-4 py-2 rounded-full font-semibold bg-green-500 text-white shadow hover:scale-105 transition-all text-base'>
                  <img src={assets.tick_icon} className='w-5' alt="Approve" /> Approve
                </button>
                : <span className='text-sm border border-green-600 bg-green-100/10 text-green-400 rounded-full px-4 py-2 font-semibold'>Approved</span>
            }
            <button onClick={deleteComment} className='flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500/30 transition-all ml-1'>
              <img src={assets.bin_icon} alt="Delete" className='w-6 h-6'/>
            </button>
        </div>
      </td>
    </tr>
  )  
}

export default CommentTableItem