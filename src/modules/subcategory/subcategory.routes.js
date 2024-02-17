import express, { Router } from "express"
import { createSubcategoryVal, paramsIdVal, updateSubcategoryVal } from "./subcategory.validation.js"
import { createSubcategory, deleteSubcategory, getAllSubcategory, getSingleSubcategory, updateSubcategory } from "./subcategory.controller.js"
import {validation} from "../../middleware/validation.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"

const subcategoryRouter  = express.Router({mergeParams: true}) 
subcategoryRouter
.route('/')
.post(protectedRoutes,allowedTo('admin'), validation(createSubcategoryVal),createSubcategory)
.get(getAllSubcategory)
subcategoryRouter
.route('/:id') 
.get(validation(paramsIdVal), getSingleSubcategory)
.put(protectedRoutes,allowedTo('admin'), validation(updateSubcategoryVal), updateSubcategory)
.delete(protectedRoutes,allowedTo('admin'), validation(paramsIdVal), deleteSubcategory)
export default subcategoryRouter 