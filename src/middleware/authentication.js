import { userModel } from "../../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"
import { catchError } from "./catchError.js"
import jwt from "jsonwebtoken";

export const protectedRoutes = catchError(async(req,res,next)=>{
    let {token} = req.headers
    //token exist or not
    if(!token) return next(new AppError('token not provided',401))
    //verify token
    let decoded = jwt.verify(token,process.env.JWT_KEY)
    //userId exist or not
    let user = await userModel.findById(decoded.userId)
    if(!user) return next(new AppError('user not found',401))
    // password change after this token 
    if(user.passwordChangedAt){
        let time = parseInt(user?.passwordChangedAt.getTime() / 1000)
        if(time> decoded.iat) return next(new AppError('invalid token.. login again',401))  
    } 
    req.user = user
    next()
}) 