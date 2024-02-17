import express from "express"
import {validation} from "../../middleware/validation.js"
import { protectedRoutes } from "../../middleware/authentication.js"
import { allowedTo } from "../../middleware/authorization.js"
import { createOrderVal } from "./order.validation.js"
import { createCashOrder, createCheckOutSession, getAllOrder, getSpecificOrder } from "./order.controller.js"
const orderRouter  = express.Router() 
orderRouter
.route('/')
.get(protectedRoutes,allowedTo('user'),getSpecificOrder)
orderRouter.get('/all',getAllOrder)
orderRouter
.route('/:id') 
.post(protectedRoutes,allowedTo('user'), validation(createOrderVal),createCashOrder)

orderRouter.post('/checkOut/:id',protectedRoutes,allowedTo('user'), createCheckOutSession)
export default orderRouter 