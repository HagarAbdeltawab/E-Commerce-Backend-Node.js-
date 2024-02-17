import { productModel } from "../../../database/models/product.model.js";
import { createOne, deleteOne, getALL, getOne, updateOne } from "../handlers/handlers.js";
export const createProduct = createOne(productModel);
export const getAllProduct = getALL(productModel);
export const getSingleProduct = getOne(productModel);
export const updateProduct = updateOne(productModel);
export const deleteProduct = deleteOne(productModel)