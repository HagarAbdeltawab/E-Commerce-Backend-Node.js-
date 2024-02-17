import express from "express"
import { createBrandVal, paramsIdVal, updateBrandVal } from "./brand.validation.js"
import { validation } from "../../middleware/validation.js"
import { createBrand, deleteBrand, getAllBrand, getSingleBrand, updateBrand } from "./brand.controller.js"
import { uploadSingleFile } from "../../services/fileUpload/uploads.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"

const brandRouter  = express.Router()
brandRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'), uploadSingleFile('img'),validation(createBrandVal),createBrand)
.get(getAllBrand)
brandRouter
.route('/:id') 
.get(validation(paramsIdVal), getSingleBrand)
.put(protectedRoutes,allowedTo('admin'), uploadSingleFile('img'),validation(updateBrandVal), updateBrand)
.delete(protectedRoutes,allowedTo('admin'), validation(paramsIdVal), deleteBrand)
export default brandRouter 