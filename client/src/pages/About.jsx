import React from 'react';

const About = () => (
  <div className="max-w-3xl mx-auto py-16 px-4 text-center">
    <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">About InkAI</h1>
    <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
      <strong>InkAI</strong> is a next-generation, AI-powered blogging platform designed to make content creation, sharing, and discovery smarter and more accessible for everyone. Whether you're a writer, reader, or community builder, InkAI provides a seamless, modern experience for all.
    </p>
    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">What Inspired InkAI?</h2>
    <p className="text-md text-zinc-600 dark:text-zinc-400 mb-6">
      As a passionate developer and avid reader, I noticed that many blogging platforms lacked intelligent features, modern design, and robust moderation. I wanted to create a space where technology and creativity meet—where AI can help writers express themselves, keep communities safe, and make discovering great content effortless. Thus, InkAI was born: inspired by the power of artificial intelligence and the desire to foster a positive, engaging blogging community.
    </p>
    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Key Features</h2>
    <ul className="text-left text-md text-zinc-700 dark:text-zinc-300 mb-8 list-disc list-inside mx-auto max-w-xl">
      <li><strong>AI-Powered Blog Generation:</strong> Instantly generate professional blog content using advanced AI models.</li>
      <li><strong>AI Moderation:</strong> All comments are checked by AI for safety and quality before being published.</li>
      <li><strong>Role-Based Dashboards:</strong> Separate admin and user dashboards for tailored experiences.</li>
      <li><strong>Infinite Scroll & Pagination:</strong> Effortlessly browse blogs with infinite scroll and fast pagination.</li>
      <li><strong>Advanced Search & Categories:</strong> Quickly find blogs by topic, category, or keyword.</li>
      <li><strong>Newsletter Subscription:</strong> Stay updated with the latest posts and news.</li>
      <li><strong>Performance Optimizations:</strong> React Query caching, MongoDB indexing, and code splitting for a fast, smooth experience.</li>
      <li><strong>Modern UI/UX:</strong> Beautiful, responsive design with dark mode, skeleton loaders, and accessibility best practices.</li>
      <li><strong>Secure Authentication:</strong> Register, login, and manage your profile securely.</li>
      <li><strong>Admin Controls:</strong> Approve blogs and comments, manage users, and keep the community safe.</li>
    </ul>
    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Our Mission</h2>
    <p className="text-md text-zinc-600 dark:text-zinc-400 mb-2">
      To empower creators and readers with intelligent tools, foster a safe and inspiring community, and push the boundaries of what blogging can be in the age of AI.
    </p>
    <p className="text-md text-zinc-600 dark:text-zinc-400">
      Thank you for being a part of InkAI. Your creativity and curiosity drive us forward!
    </p>
  </div>
);

export default About; 