import mongoose from "mongoose";
export function dbConnection (){
    mongoose.connect('mongodb+srv://route:route123@cluster0.pobnrmx.mongodb.net/e-commerce')
    .then(_ => console.log("DB connected successfully"))
    .catch(err => console.log(err))
}