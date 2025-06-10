import fs from "fs";
import imagekit from "../Configs/imagekit.js";
import Blog from "../Models/Blog.js";
import Comment from "../Models/Comments.js";
import main from "../Configs/gemini.js";
import Joi from 'joi';

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10)
});

export const addBlog = async (req,res)=>{
    try {
        const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog);
    const imageFile=req.file;
    if(!title || !subTitle || !description || !category || !isPublished || !imageFile){
        return res.status(400).json({success:false,message:"All fields are required"});
    }
    const imageBuffer=fs.readFileSync(imageFile.path);
    //upload image to imagekit
    const imageUrl=await imagekit.upload({
        file:imageBuffer,
        fileName:imageFile.originalname,
        folder:"/blogs"
    });
    console.log("image uploaded to imagekit")
    //optimzation using imagekit URL transformation
    const optimizedImageUrl=imagekit.url({
        path:imageUrl.filePath,
        transformation:[
            {width:'1280',//width resizing 
                quality:"auto",//auto compression
                format:"webp" //convert to modern format
            }]
    });
    console.log("image optimized")
const image=optimizedImageUrl;
   
await Blog.create({title,subTitle,description,category,image,isPublished,author:process.env.ADMIN_ID});
console.log("blog created")
        res.status(201).json({success:true,message:"Blog added successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }   

}
export const getBlogs = async (req, res, next) => {
  try {
    const { error, value } = paginationSchema.validate(req.query);
    if (error) return res.status(400).json({ success: false, message: error.message });
    const { page, limit } = value;
    const skip = (page - 1) * limit;
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('title subTitle image description category author createdAt')
      .lean();
    const total = await Blog.countDocuments({ isPublished: true });
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
export const getBlogById = async (req,res)=>{
    try {
        const {blog_id}=req.params;
        const blog=await Blog.findById(blog_id).populate("author","name email");
        if(!blog){
            return res.status(404).json({success:false,message:"Blog not found"});
        }
        res.status(200).json({success:true,blog});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}
export const deleteBlogById = async (req,res)=>{
    try {
        const {blog_id}=req.body;
        await Blog.findByIdAndDelete(blog_id);
        //delete all comments related to the blog
        await Comment.deleteMany({blog:blog_id});
        res.status(200).json({success:true,message:"Blog deleted successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}
export const togglePublish=async(req,res)=>{
    try {
        const {blog_id}=req.body;
        const blog=await Blog.findById(blog_id);
        blog.isPublished=!blog.isPublished;
        await blog.save();
        res.status(200).json({success:true,message:"Blog status updated successfully"});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    // AI moderation prompt
    const moderationPrompt = `
    "You are a content moderation assistant. Analyze the following text and determine whether it contains any form of hate speech, offensive language, or content that violates safety and community guidelines, such as:

Discrimination based on race, religion, gender, nationality, sexual orientation, or disability

Threats, harassment, or violent speech

Bullying, slurs, or explicit incitement to hatred or harm

Misinformation that may cause harm or panic .if you think comments is safe return  approve,, if not then return disapprove if its strongly inappropriate else return cannot say if you think a human should also check its approval.



"${content}"
    `;
    // Send to Gemini for moderation
    let isApproved = false;
    let aiDecision = 'cannot say';
    if(name==="Admin"){
        await Comment.create({ blog, name, content, isApproved: true });
        return res.status(200).json({ success: true, message: "Comment added and published successfully." });
        console.log("comment approved ")
    }   
    else{
    try {
      const aiResponse = await main(moderationPrompt);
      aiDecision = aiResponse.trim().toLowerCase();
    } catch (aiError) {
      aiDecision = 'cannot say'; // fallback to admin review
    }

    if (aiDecision === 'approve') {
        console.log("comment approved")
      await Comment.create({ blog, name, content, isApproved: true });
      return res.status(200).json({ success: true, message: "Comment added and published successfully." });
    } else if (aiDecision === 'cannot say') {
        console.log("comment cannot say")
      await Comment.create({ blog, name, content, isApproved: false });
      return res.status(200).json({ success: false, message: "We sent your comment for admin approval." });
    } else if (aiDecision === 'disapprove') {
        console.log("comment rejected")
      return res.status(411).json({ success: false, message: "Your comment was rejected for violating our guidelines." });
    } else {
      // fallback: treat as cannot say
      console.log("comment cannot say")
      await Comment.create({ blog, name, content, isApproved: false });
      return res.status(200).json({ success: true, message: "Comment added and sent for admin approval." });
    }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getBlogComments = async (req, res, next) => {
  try {
    const { blog_id } = req.body;
    if (!blog_id) return res.status(400).json({ success: false, message: 'blog_id is required' });
    const { error, value } = paginationSchema.validate(req.query);
    if (error) return res.status(400).json({ success: false, message: error.message });
    const { page, limit } = value;
    const skip = (page - 1) * limit;
    const comments = await Comment.find({ blog: blog_id, isApproved: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Comment.countDocuments({ blog: blog_id, isApproved: true });
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
export const generateContent=async(req,res)=>{
    try {
        const {prompt}=req.body;
        const content = await main(`Write a professional blog post about "${prompt}" using relevant keywords, engaging tone, proper structure (introduction, body, conclusion), and SEO-friendly tags. Do not ask for clarification, just write the article directly.`);
        res.status(200).json({success:true,content});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}