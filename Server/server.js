import express from "express";
import cors from "cors";
import  'dotenv/config';
import connectDB from "./Configs/dbConnection.js";
import adminRoutes from "./Routes/adminRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import newsletterRoutes from "./Routes/newsletter.js";
const app = express();
app.use(cors());
app.use(express.json());
//Routes
app.get("/",(req,res)=>{res.send("API is running");});
app.use("/api/admin",adminRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/user",userRoutes);
app.use("/api/newsletter",newsletterRoutes);

//port and db connection
const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


