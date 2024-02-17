import mongoose from "mongoose";
import bcrypt from "bcrypt"
const schema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: true, 
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,  
        required: true, 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive:  {
        type: Boolean,
        default: true
    },
    isBlocked:  {
        type: Boolean,
        default: false
    },
    confirmEmail:  {
        type: Boolean,
        default: false
    },
    passwordChangedAt: Date,
    wishlist:[{
        type: mongoose.Types.ObjectId,
        ref:'product'
    }],
    addresses:[{
        street: String,
        phone:String,
        city: String 
    }],
}, { timestamps: true })
//hashPassword when add user
schema.pre('save',function(){
    if(this.password) this.password = bcrypt.hashSync(this.password,8)
})
//hashPassword when update user
schema.pre('findOneAndUpdate',function(){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,8)
})

export const userModel = mongoose.model('user', schema)