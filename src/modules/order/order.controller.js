import { cartModel } from "../../../database/models/cart.model.js"
import { orderModel } from "../../../database/models/order.model.js"
import { productModel } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OivLNKI4o3vTZdFzzy8x5FXwKSfdPzd8fiXHZY3WSzHEFcXJD1WnKg0N4LerKLRjyfMZFoiw0YmC4zXHRZU5OWj00iq4PJ6mz');

export const createCashOrder = catchError(async(req,res,next)=>{
    //getCart
    let cart = await cartModel.findById(req.params.id)
    if(!cart) return next(new AppError('product not found',404))
    //totalOrderPrice
    let totalOrderPrice = 
    cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    //create order = cash
    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress,
    })
    await order.save()
    //increment sold decrement quantity
    let options = cart.cartItems.map((prod)=>{
        return({
            updateOne:{
                "filter": {"_id":prod.product},
                "update":{$inc:{sold:prod.quantity ,quantity:-prod.quantity}}
            }
        })
    })
    await productModel.bulkWrite(options)
    // clear cart
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({message:"success", order})
})

export const getSpecificOrder = catchError(async(req,res,next)=>{
    let order =  orderModel.findOne({user: req.user._id})
    res.json({message:'success',order})
}) 

export const getAllOrder = catchError(async(req,res,next)=>{
    let order =  orderModel.findOne({}).populate('cartItems.product')
    res.json({message:'success',order})
})
// session url from bank to client
export const createCheckOutSession = catchError(async(req,res,next)=>{
    const cart = await cartModel.findById(req.params.id);
    const totalOrderPrice =cart.totalPriceAfterDiscount?
        cart.totalPriceAfterDiscount : cart.totalPrice
    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
            price_data: {
                currency: 'egp',
                unit_amount: totalOrderPrice * 100,
                product_data: {
                    name: req.user.name
                    }
                },
                quantity:1
            }
        ],
        mode: 'payment',
        success_url: 'https://',
        cancel_url:'https://',
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    })
    res.json({message:'success',session})
})

export const createOnlineOrder = catchError(async(req,res,next)=>{ (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
        card(event.data.object)
        // Then define and call a function to handle the event checkout.session.completed
        break;
        // ... handle other event types
        default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();}
})

async function card(e) {
    let cart = await cartModel.findById(e.client_reference_id)
    if(!cart) return next(new AppError('product not found',404))
    let user = await userModel.findOne({email: e.email})
    
    let order = new orderModel({
        user: user._id,
        cartItems: cart.cartItems,
        totalOrderPrice: e.amount_total / 100,
        shippingAddress: e.metadata.shippingAddress,
        paymentType: 'card',
        isPaid: true,
        paidAt:Date.now(),
    })
    await order.save()
    
    if(order){
        let options = cart.cartItems.map((prod)=>{
            return({
                updateOne:{
                    "filter": {"_id":prod.product},
                    "update":{$inc:{sold:prod.quantity ,quantity:-prod.quantity}}
                }
            })
        })
        await productModel.bulkWrite(options)
        // clear cart
        await cartModel.findByIdAndDelete({user: user.id})
        res.json({message:"success", order})
    }
    return next(new AppError('order not found', 404))
}
