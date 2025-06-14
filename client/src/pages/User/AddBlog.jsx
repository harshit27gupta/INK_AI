import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AddBlog = () => {
  const { value } = useAppContext();
  const { axios, user, token } = value;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });

  useEffect(() => {
    if (!token || !user) {
      toast.error('Please login to add a blog');
      navigate('/user-login');
      return;
    }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to add a blog');
      navigate('/user-login');
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const { data } = await axios.post('/api/user/addBlog', formDataToSend);
      if (data.success) {
        toast.success('Blog added successfully!');
        setFormData({ title: '', content: '', image: null });
        navigate('/user/yourblogs');
      } else {
        toast.error(data.message || 'Failed to add blog');
      }
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error(error.response?.data?.message || 'Failed to add blog');
    } finally {
      setLoading(false);
    }
  };

  if (!token || !user) return null;

  return (
    <div className="ml-64 min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-10 drop-shadow-lg">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
        <div className="mb-6">
          <label className="block text-zinc-200 text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-zinc-400/30 text-zinc-200 focus:outline-none focus:border-indigo-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-zinc-200 text-lg font-semibold mb-2">Content</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            className="bg-white/5 rounded-lg"
            theme="snow"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
              ]
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-zinc-200 text-lg font-semibold mb-2">Cover Image</label>
          <div className="flex items-center gap-4">
            {formData.image && (
              <img src={URL.createObjectURL(formData.image)} alt="Preview" width={96} height={96} className="w-24 h-24 object-contain border border-zinc-400/30 rounded-lg" />
            )}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-zinc-400/30 text-zinc-200"
              accept="image/*"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlog; 