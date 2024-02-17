import { cartModel } from "../../../database/models/cart.model.js"
import { couponModel } from "../../../database/models/coupon.model.js"
import { productModel } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"

const calcTotalPrice = (cart)=>{
    let totalPrice = 0
    cart.cartItems.forEach(item => totalPrice += item.quantity * item.price)
    cart.totalPrice = totalPrice
    if(cart.discount){
        let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
        cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    }
}

export const addToCart = catchError(async(req,res,next)=>{
    let product = await productModel.findById(req.body.product)
    if(!product) return next(new AppError('product not found',404))
    
    if(product.quantity < req.body.quantity) return next(new AppError('sold out'))
    req.body.price = product.price
    
    let cartExist = await cartModel.findOne({user: req.user._id})
    if(!cartExist){
        let data = new cartModel({
            user: req.user._id,
            cartItems: [req.body],
        })
        calcTotalPrice(data)
        await data.save()
        !data && next(new AppError("Not found.",404))
        data && res.json({message: "Success",data})
    }else{
        let item = cartExist.cartItems.find((item)=>item.product == req.body.product)
        if(item) {
            if(item.quantity >= product.quantity) return next(new AppError('sold out'))
            item.quantity += req.body.quantity || 1
        }else cartExist.cartItems.push(req.body)
        calcTotalPrice(cartExist)
        await cartExist.save()
        res.json({message: "Success",data: cartExist})
    }
})

export const removeItemFromCart = catchError(async(req,res,next)=>{
    let data = await cartModel.findOneAndUpdate(
        {user: req.user._id},
        {$pull:{cartItems: {_id: req.params.id}}},
        {new: true})
    calcTotalPrice(data)
    await data.save()
    !data && next(new AppError("Not found.",404))
    data && res.json({message: "Success",data})
})

export const updateQuantity = catchError(async(req,res,next)=>{
    let data = await cartModel.findOne({user: req.user._id})
    !data && next(new AppError("Not found.",404))
    let item = data.cartItems.find(item => item._id == req.params.id)
    if(!item) return next(new AppError("Not found.",404))
    item.quantity = req.body.quantity
    calcTotalPrice(data)
    await data.save()   
    data && res.json({message: "Success",data})
})

export const getLoggedUserCart = catchError(async(req,res,next)=>{
    let data = await cartModel.findOne({user:req.user._id}).populate('cartItems.product')
    !data && next(new AppError("Not found.",404))
    data && res.json({message: "Success", data})
})

export const clearUserCart = catchError(async(req,res,next)=>{
    let data = await cartModel.findOneAndDelete({user:req.user._id})
    !data && next(new AppError("Not found.",404))
    data && res.json({message: "Success", data})
})

export const applyCoupon = catchError(async(req,res,next)=>{
    let coupon = await couponModel.findOne({code:req.body.coupon, expires:{$gte:Date.now()}})
    !coupon && next(new AppError("invalid coupon",401))
    let cart = await cartModel.findOne({user:req.user._id})
    !cart && next(new AppError("not found",401))
    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    cart.discount = coupon.discount
    await cart.save()
    res.json({message: "Success", cart})
})
