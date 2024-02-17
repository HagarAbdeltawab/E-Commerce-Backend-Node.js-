import express, { Router } from "express"
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js"
import { checkEmail } from "../../middleware/checkEmail.js"
import { validation } from "../../middleware/validation.js"
import { createUserVal, paramsIdVal, updateUserVal } from "./user.validation.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"

const userRouter  = express.Router()
userRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'),validation(createUserVal),checkEmail, createUser)
.get(getAllUsers)
userRouter
.route('/:id') 
.get(validation(paramsIdVal), getSingleUser)
.put(protectedRoutes,allowedTo('admin'), validation(updateUserVal), updateUser)
.delete(protectedRoutes,allowedTo('admin'), validation(paramsIdVal), deleteUser)
export default userRouter 