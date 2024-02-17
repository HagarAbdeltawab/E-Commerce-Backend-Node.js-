import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import slugify from "slugify"
import { ApiFeatures } from "../../utils/apiFeatures.js"
// add One item
export const createOne = (model)=>{
    return catchError(
        async(req,res,next)=>{
            if(req.body.title) req.body.slug = slugify(req.body.title)
            if(req.body.name) req.body.slug = slugify(req.body.name) 

            if(req.file) {
                req.body.image = req.file.filename; 
                req.body.logo = req.file.filename;
            }
            if(req.files) {
                req.body.imgCover = req.files.imgCover[0].filename;
                req.body.images = req.files.images.map(img => img.filename);
            }

            if(req.user._id && req.body.product){
                let reviewExist = await model.findOne({user:req.user._id,product:req.body.product})
                if(reviewExist) return next(new AppError('you created a review before.'))
                req.body.user = req.user._id
            }
            if(req.body.code){
                let couponExist = await model.findOne({code:req.body.code})
                if(couponExist) return next(new AppError('you created this coupon before.'))
            }

            let data = new model(req.body)
            await data.save() 
            res.json({message: "Success",data})
        }
    )
}
// get all items
export const getALL = (model)=>{
    return catchError(
        async(req,res,next)=>{ 
            let filterObj ={};
            if(req.params.category){
                filterObj.category =req.params.category
            }
            let apiFeatures = new ApiFeatures(model.find(filterObj),req.query)
            .pagination().fields().sort().search().filter()   
            let data = await apiFeatures.mongooseQuery
            res.json({message: "Success",data})
        }
    )
}
// get One item by its id
export const getOne = (model)=>{
    return catchError(
        async(req,res,next)=>{ 
            let data = await model.findById(req.params.id)
            !data && next(new AppError("Not found.",404))
            data && res.json({message: "Success",data})
        }
    )
}
// update One item by its id
export const updateOne = (model)=>{
    return catchError(
        async(req,res,next)=>{ 
            if(req.body.name) req.body.slug = slugify(req.body.name)
            if(req.body.title) req.body.slug = slugify(req.body.title)
            if(req.file) {
                req.body.image = req.file.filename  
                req.body.logo = req.file.filename
            }
            if(req.files){ 
                req.body.imgCover = req.files.imgCover[0].filename
                req.body.images = req.files.images.map(img => img.filename)
            }
            
            if(req.user._id && req.body.product){
                let reviewExist = await model.findOne({user:req.user._id,product:req.body.product})
                if(!reviewExist) return next(new AppError('not authorize update this review'))
            }
            if(req.body.code){
                let couponExist = await model.findOne({code:req.body.code})
                if(couponExist) return next(new AppError('you created this coupon before.'))
            }
            let data = await model.findOneAndUpdate({_id:req.params.id},req.body,{new: true})
            !data && next(new AppError("Not found.",404))
            data && res.json({message: "Success",data})
        }
    )
}
// delete One item by its id
export const  deleteOne = (model)=>{
    return catchError(
        async(req,res,next)=>{  
            let data = await model.findOneAndDelete({_id:req.params.id})
            !data && next(new AppError("Not found.",404))
            data && res.json({message: "Success",data})
        }
    )
}