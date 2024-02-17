import express from "express"
import { validation } from "../../middleware/validation.js"
import { createProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from "./product.controller.js"
import { createProductVal, paramsIdVal, updateProductVal } from "./product.validation.js"
import { uploadFields } from "../../services/fileUpload/uploads.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"

const productRouter  = express.Router()
productRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'), uploadFields([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}]),validation(createProductVal),createProduct)
.get(getAllProduct)
productRouter
.route('/:id') 
.get(validation(paramsIdVal), getSingleProduct)
.put(protectedRoutes,allowedTo('admin'),uploadFields([{name:'imgCover',maxCount:1},{name:'images',maxCount:10}]),validation(updateProductVal), updateProduct)
.delete(protectedRoutes,allowedTo('admin'), validation(paramsIdVal), deleteProduct)
export default productRouter 