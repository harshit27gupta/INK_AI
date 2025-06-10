import jwt from "jsonwebtoken";
const auth=async(req,res,next)=>{
        const token=req.headers.authorization;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = { id: decoded.id, email: decoded.email, role: decoded.role || 'user' };
            next();
        } catch (error) {
            res.status(401).json({message:"Invalid token"});
        }
        finally{
            // console.log("auth also done")
        }
}
export default auth;