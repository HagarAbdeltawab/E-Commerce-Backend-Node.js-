import mongoose from "mongoose";
import multer from "multer"; 
const fileUpload = ()=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')},
        filename: function (req, file, cb) {
            cb(null, new mongoose.Types.ObjectId + '-' + file.originalname)}
    })   
    function fileFilter (req, file, cb) {
        
        if(file.mimetype.startsWith('image')) {
            cb(null, true)
        }else{
            cb(new AppError('images only',401), false) 
        }
    }  
    const upload = multer({ storage, fileFilter}) 
    return upload;  
}
export const uploadSingleFile = fieldName => fileUpload().single(fieldName);
export const uploadArrayOfFile = fieldName => fileUpload().array(fieldName,10);  
export const uploadFields = fields => fileUpload().fields(fields);