import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { blog_data } from '../assets/assets'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import moment from 'moment'
import { comments_data } from '../assets/assets'
import { assets } from '../assets/assets'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import Notfound from '../components/Notfound'

function BlogSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto animate-pulse">
      <div className="w-full h-80 bg-gray-300 rounded-xl mb-8" />
      <div className="h-10 bg-gray-300 rounded w-3/4 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-8" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-8" />
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-white/10 border border-white/10 shadow-lg animate-pulse mb-4">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <div className="h-4 bg-gray-300 rounded w-24" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mt-2 ml-11" />
    </div>
  );
}

const Blog = () => {
  const {id} = useParams();
  const { value } = useAppContext();
  const { axios,user } = value;
  console.log("user:",user)
  const role = user?.role || '';
  const canComment = role === 'admin' || role === 'user';
  const [data, setData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () =>{
    try{
      const {data}=await axios.get(`/api/blog/${id}`);
      if(data.success){
        setData(data.blog);
      }
      else{
        if (data.message && data.message !== 'Internal Server Error') {
          toast.error(data.message);
        }
      }
    }catch(error){
      const backendMsg = error.response?.data?.message;
      if (error.response && error.response.status === 404) {
        toast.error('Blog not found.');
      } else {
        toast.error(backendMsg || error.message);
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  const fetchComments = async (axios, id) => {
    const { data } = await axios.post(`/api/blog/comments`, { blog_id: id });
    if (!data.success) throw new Error(data.message);
    return data.comments;
  };

  const {
    data: comments = [],
    isLoading: commentsLoading,
    error: commentsError,
    refetch: refetchComments
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchComments(axios, id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!id
  });

  useEffect(() => {
    setLoading(true);
    fetchBlogData();
  }, [id]);

  const addComment=async(e)=>{
    e.preventDefault();
    try{
      setSubmitting(true);
      const comment=e.target.comment.value.trim();
      if (!comment) {
        setSubmitting(false);
        return;
      }
      const name=role==="admin"?"Admin":user?.name || "Anonymous";
      const {data}=await axios.post(`/api/blog/add-comment`,{blog:id,name,content:comment});
      setTimeout(async () => {
        setSubmitting(false);
        if(data.success){
          toast.success(data.message);
          e.target.reset();
          await refetchComments();
        }
        else{
          toast.error(data.message);
          e.target.reset();
        }
      }, 1200);
    }catch(error){
      setSubmitting(false);
      const backendMsg = error.response?.data?.message;
      toast.error(backendMsg || error.message);
      e.target.reset();
    }
  } 

  if (loading || commentsLoading) return (
    <div className="min-h-screen flex flex-col items-center py-10 px-2">
      <BlogSkeleton />
      <div className="w-full max-w-3xl mx-auto mt-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg font-bold bg-gradient-to-r from-[#A5B4FC] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">Comments</span>
          <span className="text-sm text-[#D1D5DB] bg-zinc-800/60 rounded-full px-3 py-1 ml-2">...</span>
        </div>
        <div className="flex flex-col gap-6 mb-12">
          {[...Array(3)].map((_, i) => <CommentSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
  if (!data) return <Notfound/>;

  return data?
    <div>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center py-10 px-2">
        <div className="w-full max-w-3xl mx-auto">
          {/* Blog Image */}
          {data.image && (
            <img src={data.image} alt={data.title} className="w-full max-h-80 object-cover rounded-xl shadow mb-8" />
          )}
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-[#A5B4FC] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent mb-4 drop-shadow-lg">
            {data.title}
          </h1>
          {/* Subtitle */}
          {data.subTitle && (
            <h2 className="text-xl sm:text-2xl text-[#F8FAFC] font-medium text-center mb-4">{data.subTitle}</h2>
          )}
          {/* Author/Date */}
          <div className="flex items-center justify-center gap-2 text-[#D1D5DB] text-sm opacity-80 my-8">
          <span>{data.author?.name || "Unknown Author"}</span>
            <span className="w-1 h-1 bg-[#9CA3AF] rounded-full"></span>
            <span>Published {moment(data.createdAt).format('MMM Do, YYYY')}</span>
          </div>
          {/* Divider */}
          <div className="border-t border-zinc-700 mb-8"></div>
          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none text-zinc-100 rich-text mx-auto">
            <div dangerouslySetInnerHTML={{__html:data.description}}></div>
          </div>
          {/* Comments */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg font-bold bg-gradient-to-r from-[#A5B4FC] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">Comments</span>
              <span className="text-sm text-[#D1D5DB] bg-zinc-800/60 rounded-full px-3 py-1 ml-2">{comments.length}</span>
            </div>
            {commentsError && <div className="text-red-400">{commentsError.message}</div>}
            <div className="flex flex-col gap-6 mb-12">
            {comments.map((item, index) => (
  <div key={index} className="p-5 rounded-2xl bg-white/10 dark:bg-zinc-900/60 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-fade-in">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3 mb-1">
        <img src={assets.user_icon} alt="" className="w-8 h-8 rounded-full bg-zinc-200" />
        <span className="font-bold text-base bg-gradient-to-r from-[#A5B4FC] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
          {item.name}
        </span>
      </div>
      <span className="text-xs text-zinc-400 mt-1">{moment(item.createdAt).fromNow()}</span>
    </div>
    <p className="text-lg text-zinc-100 mt-1 ml-11">{item.content}</p>
  </div>
))}

            </div>
            {/* Add Comment Form */}
            <form className="w-full max-w-xl mx-auto bg-white/10 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-4 shadow-lg" onSubmit={addComment}>
              <label className="font-semibold text-zinc-200 mb-1">Add your Thoughts</label>
              <textarea name="comment" placeholder="Comment" rows={4} required disabled={!canComment} className="rounded-md px-4 py-2 bg-zinc-900/60 text-zinc-100 placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none disabled:opacity-60 disabled:cursor-not-allowed" />
              <button type="submit"  disabled={submitting || !canComment} className={`mt-2 px-6 py-2 rounded-md font-semibold shadow-md transition-all flex items-center justify-center ${!canComment ? 'bg-red-500 text-white cursor-not-allowed opacity-80' : 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white hover:from-pink-400 hover:to-indigo-400'}`}>
                {submitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                ) : !canComment ? 'Login to comment' : 'Submit'}
              </button>
              {!canComment && (
                <div className="text-red-400 text-center text-sm mt-2">You must be logged in as a user or admin to comment.</div>
              )}
            </form>
            {/* Social Share Section */}
            <div className="w-full max-w-xl mx-auto mt-10 flex flex-col items-center gap-3">
              <span className="text-zinc-300 font-medium">Share this article on social media</span>
              <div className="flex gap-4 mt-2">
                <a href="#" title="Share on Facebook" className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-pink-400 hover:scale-110 transition-all">
                  <img src={assets.facebook_icon} alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="#" title="Share on Twitter" className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-pink-400 hover:scale-110 transition-all">
                  <img src={assets.twitter_icon} alt="Twitter" className="w-8 h-8" />
                </a>
                <a href="#" title="Share on Google+" className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-pink-400 hover:scale-110 transition-all">
                  <img src={assets.googleplus_icon} alt="Google" className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  : null;
}

export default Blog