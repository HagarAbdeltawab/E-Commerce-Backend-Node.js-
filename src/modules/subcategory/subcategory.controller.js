import {subcategoryModel} from "../../../database/models/subcategory.model.js";
import { updateOne, deleteOne, getALL, getOne, createOne } from "../handlers/handlers.js"
export const createSubcategory = createOne(subcategoryModel);
export const getAllSubcategory = getALL(subcategoryModel);
export const getSingleSubcategory = getOne(subcategoryModel);
export const updateSubcategory = updateOne(subcategoryModel);
export const deleteSubcategory= deleteOne(subcategoryModel);