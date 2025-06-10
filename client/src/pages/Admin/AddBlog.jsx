import React, { useRef } from 'react'
import { assets } from '../../assets/assets'
import { useEffect, useState } from 'react'
import Quill from 'quill'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
import { parse } from 'marked';
import { useQueryClient } from '@tanstack/react-query';

const AddBlog = () => {
    const { value } = useAppContext();
    const { axios,user } = value;
    const role = user?.role || 'user';
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);
   const [adding,setIsAdding]=useState(false);
   const [loading,setLoading]=useState(false);
   const queryClient=useQueryClient();
    const categories = ["Startup", "Technology", "Lifestyle", "Finance"];

    useEffect(() => {
        // Initiate Quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Share your thoughts...'
            });
        }
    }, []);
    

    const onSubmitHandler = async (e) => {
        try{
        e.preventDefault();
        setIsAdding(true);
           const blog={
            title,
            subTitle,
            category,
            description:quillRef.current.root.innerHTML,
            isPublished,
           }
           const formData=new FormData();
           formData.append("blog",JSON.stringify(blog));
           formData.append("image",image);
        //    console.log("my form data",formData);
           const url = role === 'admin' ? '/api/blog/add' : '/api/user/addBlog';
           const {data}=await axios.post(url,formData);
            if(data.success){
                setTitle('');
                setSubTitle('');
                setCategory('Startup');
                setIsPublished(false);
                setImage(false);
                quillRef.current.root.innerHTML='';
                toast.success(data.message);
               await  queryClient.refetchQueries({queryKey:['dashboard',role]});
               await queryClient.refetchQueries({queryKey:['blogs']});
               await queryClient.refetchQueries({queryKey:['allBlogs']});
            }
        }catch(error){
            const backendMsg = error.response?.data?.message;
            toast.error(backendMsg || error.message);
        }finally{
            setIsAdding(false);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const generateDescription = async () => {
        // AI description logic
        if(!title){
            toast.error("Title is required");
            return;
        }
      try{
        setLoading(true);
        const {data}=await axios.post("/api/blog/generate",{prompt:title});
        if(data.success){
            quillRef.current.root.innerHTML=parse(data.content);
        }
        else{
            toast.error(data.message);
        }
      }catch(error){
        const backendMsg = error.response?.data?.message;
        toast.error(backendMsg || error.message);
    }finally{
        setLoading(false);
    }
}
    return (
        <div className="ml-64 min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
            <form onSubmit={onSubmitHandler} className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 flex flex-col gap-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 text-center">Add New Blog</h1>
                <div className="flex flex-col items-center gap-2">
                    <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center w-40 h-40 bg-white/20 border-2 border-dashed border-white/30 rounded-xl hover:bg-white/30 transition-all">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Upload" className="w-24 h-24 object-contain" />
                        <input type="file" id='image' hidden required onChange={handleImageChange} />
                        <span className="text-xs text-zinc-200 mt-2">Upload Thumbnail</span>
                    </label>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-zinc-200">Blog Title</label>
                    <input type="text" placeholder='Enter Blog Title' value={title} onChange={(e) => setTitle(e.target.value)} required className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-zinc-200">Sub Title</label>
                    <input type="text" placeholder='Enter Sub Title' value={subTitle} onChange={(e) => setSubTitle(e.target.value)} required className="rounded-lg px-4 py-3 bg-white/20 text-zinc-100 placeholder-zinc-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-zinc-200 mb-1">Blog Description</label>
                    <div className="relative bg-white/10 rounded-xl border border-white/20 p-4 min-h-[320px]">
                        <div ref={editorRef} className="min-h-[240px] bg-transparent" />
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/40 rounded-xl z-10">
                                <span className="inline-block w-10 h-10 border-4 border-t-transparent border-indigo-400 border-r-purple-400 border-b-pink-400 border-l-indigo-400 rounded-full animate-spin"></span>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        <button
    type='button'
    disabled={loading}
    onClick={generateDescription}
    className="absolute bottom-8 right-7 cursor-pointer px-3 py-1 text-xs rounded-full font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
>
    Generate with AI
</button>

                    </div>
                </div>
                <div className="flex flex-col gap-6 mt-6">
  <div className="flex flex-col gap-1 relative">
    <label className="font-semibold text-zinc-200">Blog Category</label>
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-4 py-3 relative">
    <select
  value={category}
  onChange={e => setCategory(e.target.value)}
  name="category"
  className="w-full rounded-lg bg-transparent text-zinc-100 border-none pr-10 focus:outline-none focus:ring-0 focus:border-none transition-all font-medium appearance-none cursor-pointer"
  required
>

        <option value="" disabled>Select category</option>
        {categories.map((item, index) => (
          <option key={index} value={item} className="text-zinc-900">{item}</option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
  </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                        <input
                            type="checkbox"
                            id="publish"
                            checked={isPublished}
                            className="accent-pink-500 w-5 h-5 focus:ring-2 focus:ring-indigo-400 transition-all"
                            onChange={e => setIsPublished(e.target.checked)}
                        />
                        <label htmlFor="publish" className="text-zinc-200 font-medium select-none cursor-pointer">Publish immediately</label>
                    </div>
                </div>
                <button
                    disabled={adding}
                    type="submit"
                    className="w-full mt-8 py-3 font-bold rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:from-pink-500 hover:to-indigo-500 hover:scale-105 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    {adding ? "Adding..." : "Add Blog"}
                </button>
            </form>
        </div>
    )
}

export default AddBlog