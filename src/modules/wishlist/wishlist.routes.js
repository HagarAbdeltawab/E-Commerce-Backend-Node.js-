import express from "express"
import {validation} from "../../middleware/validation.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { addToWishlistVal, paramsIdVal } from "./wishlist.validation.js"
import { addToWishlist, getLoggedWishlist, removeFromWishlist } from "./wishlist.controller.js"

const wishlistRouter  = express.Router() 
wishlistRouter
.route('/')
.post(protectedRoutes, allowedTo('user'), validation(addToWishlistVal),addToWishlist)
.get(protectedRoutes, allowedTo('user'), getLoggedWishlist)
wishlistRouter
.route('/:id') 
.delete(protectedRoutes,allowedTo('user','admin'), validation(paramsIdVal), removeFromWishlist)
export default wishlistRouter 