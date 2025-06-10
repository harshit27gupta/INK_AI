import express from 'express';
import { register, login, userDashboard, addBlog, yourBlogs, generateContent } from '../Controllers/userController.js';
import auth from '../Middleware/auth.js';
import { requireRole } from '../Middleware/role.js';
import upload from '../Middleware/multer.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', auth, requireRole('user'), userDashboard);
router.post('/addBlog', auth,upload.single("image"), requireRole('user'), addBlog);
router.get('/yourblogs', auth, requireRole('user'), yourBlogs);
router.post('/generate', auth, requireRole('user'), generateContent);
export default router; 