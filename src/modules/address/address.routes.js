import express from "express"
import {validation} from "../../middleware/validation.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { addToAddress, getLoggedAddress, removeFromAddress } from "./address.controller.js"
import { addToAddressVal, paramsIdVal } from "./address.validation.js"

const addressRouter  = express.Router() 
addressRouter
.route('/')
.post(protectedRoutes, allowedTo('user'), validation(addToAddressVal),addToAddress)
.get(protectedRoutes, allowedTo('user'), getLoggedAddress)
addressRouter
.route('/:id') 
.delete(protectedRoutes,allowedTo('user','admin'), validation(paramsIdVal), removeFromAddress)
export default addressRouter 