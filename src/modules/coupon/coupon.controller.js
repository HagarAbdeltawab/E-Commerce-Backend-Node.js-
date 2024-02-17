import { couponModel } from "../../../database/models/coupon.model.js";
import { updateOne, deleteOne, getALL, getOne, createOne } from "../handlers/handlers.js"
export const createCoupon = createOne(couponModel);
export const getAllCoupons = getALL(couponModel);
export const getSingleCoupon = getOne(couponModel);
export const updateCoupon = updateOne(couponModel);
export const deleteCoupon= deleteOne(couponModel);