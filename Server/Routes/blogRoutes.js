import express from "express";
import upload from "../Middleware/multer.js";
import { addBlog,getBlogs,getBlogById,deleteBlogById,togglePublish,addComment,getBlogComments,generateContent } from "../Controllers/blogController.js";
import auth from "../Middleware/auth.js";
const blogRouter=express.Router();
blogRouter.post("/add",upload.single("image"),auth,addBlog);
blogRouter.get("/all",getBlogs);
blogRouter.get("/:blog_id",getBlogById);
blogRouter.post("/delete",auth,deleteBlogById);
blogRouter.post("/toggle-publish",auth,togglePublish);
blogRouter.post("/generate",auth,generateContent);
blogRouter.post("/add-comment",auth,addComment);
blogRouter.post("/comments",getBlogComments);


export default blogRouter;