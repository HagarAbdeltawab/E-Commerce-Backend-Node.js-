import express from "express"
import {validation} from "../../middleware/validation.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { createReview, deleteReview, getAllReviews, getSingleReview, updateReview } from "./review.controller.js"
import { createReviewVal, paramsIdVal, updateReviewVal } from "./review.validation.js"

const reviewRouter  = express.Router() 
reviewRouter
.route('/')
.post(protectedRoutes,allowedTo('user'), validation(createReviewVal),createReview)
.get(getAllReviews)
reviewRouter
.route('/:id') 
.get(validation(paramsIdVal), getSingleReview)
.put(protectedRoutes,allowedTo('user'), validation(updateReviewVal), updateReview)
.delete(protectedRoutes,allowedTo('user','admin'), validation(paramsIdVal), deleteReview)
export default reviewRouter 