import jwt from "jsonwebtoken";
import Blog from "../Models/Blog.js";
import Comment from "../Models/Comments.js";
import Joi from 'joi';

export const adminLogin = async (req,res)=>{
 try {
    const {email,password} = req.body;
    console.log('Admin Login Request:', req.body);
    // console.log(email,password);
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"1h"});
    console.log('Generated Token:', token);
    res.status(200).json({success:true,message:"Admin logged in successfully",token});
  
 } catch (error) {
    res.status(500).json({success:false,message:error.message});
 }
}

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10)
});

export const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const { error, value } = paginationSchema.validate(req.query);
    if (error) return res.status(400).json({ success: false, message: error.message });
    const { page, limit } = value;
    const skip = (page - 1) * limit;
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('title subTitle category author createdAt isPublished')
      .lean();
    const total = await Blog.countDocuments();
    res.status(200).json({
      success: true,
      blogs,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCommentsAdmin = async (req, res, next) => {
  try {
    const { error, value } = paginationSchema.validate(req.query);
    if (error) return res.status(400).json({ success: false, message: error.message });
    const { page, limit } = value;
    const skip = (page - 1) * limit;
    const comments = await Comment.find({})
      .populate('blog')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Comment.countDocuments();
    res.status(200).json({
      success: true,
      comments,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboard=async(req,res)=>{
    try {
      const recentBlogs=await Blog.find({}).sort({createdAt:-1}).limit(5);
      const blogs=await Blog.countDocuments();
      const comments=await Comment.countDocuments();
      const drafts=await Blog.countDocuments({isPublished:false});
      const dashboardData={
        recentBlogs,
        blogs,
        comments,
        drafts
      }
        res.status(200).json({success:true,dashboardData});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}
export const deleteCommentById=async(req,res)=>{
    try {
        const {id}=req.body;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Comment deleted successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}
export const approveComment=async(req,res)=>{
    try {
        const {id}=req.body;
        await Comment.findByIdAndUpdate(id,{isApproved:true});
        res.status(200).json({success:true,message:"Comment approved successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}