import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const signUp = catchError(async(req,res)=>{
    let user = new userModel(req.body)
    await user.save() 
    let token = jwt.sign({userId:user._id,role: user.role},process.env.JWT_KEY)
    res.json({message: "Success",token})
})

export const signIn = catchError(async(req,res,next)=>{
    let user = await userModel.findOne({email: req.body.email})
    if (user && bcrypt.compareSync(req.body.password, user.password)){
        let token = jwt.sign({userId:user._id,role: user.role},process.env.JWT_KEY)
        return res.json({message: "Success", token})
    }
    next(new AppError("incorrect email or password",401))
}) 

export const changePassword = catchError(async(req,res,next)=>{
    let user = await userModel.findById(req.user._id)
    if (user && bcrypt.compareSync(req.body.password, user.password)){
        let token = jwt.sign({userId:user._id,role: user.role},process.env.JWT_KEY)
        await userModel.findByIdAndUpdate(req.user._id,{password:req.body.newPassword,passwordChangedAt:Date.now()})
        return res.json({message: "Success", token})
    }
    next(new AppError("incorrect email or password",401))
}) 