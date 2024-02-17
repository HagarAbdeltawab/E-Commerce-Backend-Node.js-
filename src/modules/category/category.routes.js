import express from "express"
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "./category.controller.js"
import { validation } from "../../middleware/validation.js"
import { createCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js"
import { uploadSingleFile } from "../../services/fileUpload/uploads.js"
import subcategoryRouter from "../subcategory/subcategory.routes.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"

const categoryRouter  = express.Router()
categoryRouter.use('/:category/subcategories',subcategoryRouter)
categoryRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'), uploadSingleFile('img'),validation(createCategoryVal),createCategory)
.get(getAllCategory)
categoryRouter
.route('/:id') 
.get(validation(paramsIdVal), getSingleCategory)
.put(protectedRoutes, allowedTo('admin'), uploadSingleFile('img'),validation(updateCategoryVal), updateCategory)
.delete(protectedRoutes, allowedTo('admin'), validation(paramsIdVal), deleteCategory)

export default categoryRouter 