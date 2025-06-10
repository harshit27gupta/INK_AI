import multer from "multer";
const upload=multer({storage:multer.diskStorage({})});
// console.log("uploaded on multer")
export default upload;