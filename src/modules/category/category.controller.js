import { categoryModel } from "../../../database/models/category.model.js";
import { createOne, deleteOne, getALL, getOne, updateOne } from "../handlers/handlers.js";
export const createCategory = createOne(categoryModel);
export const getAllCategory = getALL(categoryModel);
export const getSingleCategory = getOne(categoryModel);
export const updateCategory = updateOne(categoryModel);
export const deleteCategory = deleteOne(categoryModel);