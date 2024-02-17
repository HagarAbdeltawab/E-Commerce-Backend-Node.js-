import { brandModel } from "../../../database/models/brand.model.js";
import { createOne, deleteOne, getALL, getOne, updateOne } from "../handlers/handlers.js";
export const createBrand = createOne(brandModel);
export const getAllBrand = getALL(brandModel);
export const getSingleBrand = getOne(brandModel);
export const updateBrand = updateOne(brandModel);
export const deleteBrand = deleteOne(brandModel);