import express from "express";
import { adminLogin,getAllBlogsAdmin,getAllCommentsAdmin,getDashboard,deleteCommentById,approveComment} from "../Controllers/adminController.js";

const router = express.Router();

router.post("/login",adminLogin);
router.get("/blogs",getAllBlogsAdmin);
router.get("/comments",getAllCommentsAdmin);
router.get("/dashboard",getDashboard);
router.post("/delete-comment",deleteCommentById);
router.post("/approve-comment",approveComment);






export default router; 