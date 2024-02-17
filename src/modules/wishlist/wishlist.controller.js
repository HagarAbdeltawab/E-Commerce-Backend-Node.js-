import { userModel } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"

export const addToWishlist = catchError(async(req,res,next)=>{
    let data = await userModel.findByIdAndUpdate(
        req.user._id,
        {$addToSet:{wishlist: req.body.product}},
        {new: true}).populate('wishlist')
    !data && next(new AppError("Not found.",404))
    data && res.json({message: "Success",wishlist: data.wishlist})
})

export const removeFromWishlist = catchError(async(req,res,next)=>{
    let data = await userModel.findByIdAndUpdate(
        req.user._id,
        {$pull:{wishlist: req.params.id}},
        {new: true}).populate('wishlist')
    !data && next(new AppError("Not found.",404))
    data && res.json({message: "Success",wishlist: data.wishlist})
})

export const getLoggedWishlist = catchError(async(req,res,next)=>{
    let {wishlist} = await userModel.findById(req.user._id)
    !wishlist && next(new AppError("Not found.",404))
    wishlist && res.json({message: "Success", wishlist})
})