import User from '../Models/User.js';
import Blog from '../Models/Blog.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import imagekit from '../Configs/imageKit.js';
import main from '../Configs/gemini.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('User Register Request:', req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ success: true, message: 'User registered successfully', token, user: { _id: user._id, name: user.name, email: user.email} });
  } catch (error) {
    console.log('Register Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log('User Login Request:', req.body);
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, message: 'Login successful', token, user: { _id: user._id, name: user.name, email: user.email} });
  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("user is",  userId);
    const blogs = await Blog.find({ author: userId });
    const comments = blogs.reduce((acc, blog) => acc + (blog.comments ? blog.comments.length : 0), 0);
    const drafts = blogs.filter(blog => !blog.isPublished).length;
    const dashboardData = {
      blogs: blogs.length,
      comments,
      drafts,
      recentBlogs: blogs.slice(0, 5),
    };
    res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;
    if (!title || !subTitle || !description || !category || !isPublished || !imageFile) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const imageBuffer = fs.readFileSync(imageFile.path);
    // upload image to imagekit
    const imageUrl = await imagekit.upload({
      file: imageBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs"
    });
    // optimization using imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: imageUrl.filePath,
      transformation: [
        {
          width: '1280',
          quality: "auto",
          format: "webp"
        }
      ]
    });
    const image = optimizedImageUrl;
    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
      author: userId
    });
    // await User.findByIdAndUpdate(userId, { $push: { blogs: blog._id } });
    res.status(201).json({ success: true, message: 'Blog added successfully', blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const yourBlogs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const blogs = await Blog.find({ author: userId, isPublished: true })
      .sort({ createdAt: -1 })
      .select('title subTitle category  description  image   createdAt')
      .lean();
    res.status(200).json({
      success: true,
      blogs,
      total: blogs.length
    });
  } catch (error) {
    next(error);
  }
};

export const generateContent=async(req,res)=>{
  try {
      const {prompt}=req.body;
      const content = await main(`Write a professional blog post about "${prompt}" using relevant keywords, engaging tone, proper structure (introduction, body, conclusion). Do not ask for clarification, just write the article directly.`);
      res.status(200).json({success:true,content});
  } catch (error) {
      res.status(500).json({success:false,message:error.message});
  }
}
