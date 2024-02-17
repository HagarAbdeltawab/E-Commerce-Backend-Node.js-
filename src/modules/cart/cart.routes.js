import express from "express"
import {validation} from "../../middleware/validation.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { addToCartVal, paramsIdVal, updateCartVal } from "./cart.validation.js"
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQuantity } from "./cart.controller.js"

const cartRouter  = express.Router() 
cartRouter.post('/applyCoupon',protectedRoutes, allowedTo('user'),applyCoupon)
cartRouter
.route('/')
.post(protectedRoutes, allowedTo('user'), validation(addToCartVal),addToCart)
.get(protectedRoutes, allowedTo('user'), getLoggedUserCart)
.delete(protectedRoutes, allowedTo('user'), clearUserCart)
cartRouter
.route('/:id') 
.delete(protectedRoutes,allowedTo('user','admin'), validation(paramsIdVal), removeItemFromCart)
.put(protectedRoutes,allowedTo('user'), validation(updateCartVal), updateQuantity)
export default cartRouter 