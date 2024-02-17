import express from "express"
import {validation} from "../../middleware/validation.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { createCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "./coupon.controller.js"
import { createCouponVal, paramsIdVal, updateCouponVal } from "./coupon.validation.js"

const couponRouter  = express.Router() 
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter
.route('/')
.post(validation(createCouponVal),createCoupon)
.get(getAllCoupons)
couponRouter
.route('/:id') 
.get(validation(paramsIdVal), getSingleCoupon)
.put(validation(updateCouponVal), updateCoupon)
.delete(validation(paramsIdVal), deleteCoupon)
export default couponRouter 