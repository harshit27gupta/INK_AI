import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/blog/${_id}`)}
    className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-pink-500/30 duration-300 cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 transition-all group"
    style={{ boxShadow: '0 12px 36px 0 rgba(31, 38, 135, 0.2)' }}
  >
  
      <div className="relative">
        <img
          src={image}
          alt={""}
          width={400}
          height={225}
          className="aspect-video w-full object-cover group-hover:opacity-90 transition duration-300"
        />
      </div>
      {/* Category Badge Below Image */}
      <div className="flex flex-wrap gap-2 px-5 mt-3 mb-1">
        <span
          className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md"
        >
          {category}
        </span>
      </div>
      <div className="p-6">
  <h5 className="mb-2 font-bold text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
    {title}
  </h5>
  <p className="mb-3 text-sm text-zinc-200 min-h-[60px]"
    dangerouslySetInnerHTML={{
      __html:
        description.slice(0, 50) + (description.length > 100 ? '...' : ''),
    }}
  ></p>
</div>

    </div>
  );
};

export default BlogCard;
