import express from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { changePassword, signIn, signUp } from "./auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { changePasswordVal, signInSchemaVal, signUpSchemaVal } from "./auth.validation.js";
import { protectedRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";
const authRouter = express.Router()
authRouter.post('/signUp', validation(signUpSchemaVal),checkEmail, signUp)
authRouter.post('/signIn', validation(signInSchemaVal),signIn)
authRouter.patch('/changePassword',protectedRoutes,allowedTo('user','admin'), validation(changePasswordVal),changePassword)
export default authRouter;