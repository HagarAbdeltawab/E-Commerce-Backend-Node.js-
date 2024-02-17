import { userModel } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"

export const addToAddress = catchError(async(req,res,next)=>{
    let data = await userModel.findByIdAndUpdate(
        req.user._id,
        {$addToSet:{addresses: req.body}},
        {new: true})
    !data && next(new AppError("Not found.",404))
    data && res.json({message: "Success",addresses: data.addresses})
})

export const removeFromAddress = catchError(async(req,res,next)=>{
    let data = await userModel.findByIdAndUpdate(
        req.user._id,
        {$pull:{addresses: {_id: req.params.id}}},
        {new: true})
    !data && next(new AppError("Not found.",404))
    data && res.json({message: "Success",addresses: data.addresses})
})

export const getLoggedAddress = catchError(async(req,res,next)=>{
    let {addresses} = await userModel.findById(req.user._id)
    !addresses && next(new AppError("Not found.",404))
    addresses && res.json({message: "Success", addresses})
})