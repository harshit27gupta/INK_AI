import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import BlogCard from './BlogCard'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

const LIMIT = 10;

const fetchBlogs = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`/api/blog/all?page=${pageParam}&limit=${LIMIT}`);
  if (!data.success) throw new Error(data.message);
  return {
    blogs: data.blogs,
    nextPage: data.blogs.length === LIMIT ? pageParam + 1 : undefined,
    total: data.total,
  };
};

const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [input, setInput] = useState("");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['allBlogs'],
    queryFn: fetchBlogs,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-400">{error.message}</div>;

  // Flatten all pages into a single array
  const blogs = data.pages.flatMap(page => page.blogs);

  const filterBlogs = () => {
    if (input !== '') {
      return blogs.filter((blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
      );
    }
    return blogs;
  };
  const filteredBlogs = filterBlogs();

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative bg-white/10 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-white/20 w-fit mx-auto">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setActiveCategory(item)}
              className={`cursor-pointer px-4 py-1 rounded-full transition-all duration-200 ${
                activeCategory === item
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
      <InfiniteScroll
        dataLength={filteredBlogs.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={<p className="text-center text-zinc-400 mt-8">No more blogs</p>}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
          {filteredBlogs
            .filter((blog) => activeCategory === "All" ? true : blog.category === activeCategory)
            .map((blog) => <BlogCard key={blog._id} blog={blog} />)
          }
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BlogList;
