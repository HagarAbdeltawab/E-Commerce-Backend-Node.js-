import { userModel } from "../../../database/models/user.model.js";
import { createOne, deleteOne, getALL, getOne, updateOne } from "../handlers/handlers.js";
export const createUser= createOne(userModel);
export const getAllUsers= getALL(userModel);
export const getSingleUser = getOne(userModel);
export const updateUser = updateOne(userModel);
export const deleteUser = deleteOne(userModel);