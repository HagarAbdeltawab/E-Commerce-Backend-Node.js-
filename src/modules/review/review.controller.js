import { reviewModel } from "../../../database/models/review.model.js";
import { updateOne, deleteOne, getALL, getOne, createOne } from "../handlers/handlers.js"
export const createReview = createOne(reviewModel);
export const getAllReviews = getALL(reviewModel);
export const getSingleReview = getOne(reviewModel);
export const updateReview = updateOne(reviewModel);
export const deleteReview= deleteOne(reviewModel);