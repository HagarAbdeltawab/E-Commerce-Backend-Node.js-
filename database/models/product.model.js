import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short product title'],
        maxLength: [150, 'too long product title']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String, 
        trim: true,
        required: true,
        minLength: [10, 'too short product description'],
        maxLength: [1500, 'too long product description']
    },
    imgCover: String,
    images: [],
    price: {
        type: Number,
        min: 0,
        required: true
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
        required: true  //Why??
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    sold: Number,
    rateAvg: {
        type: Number,
        max: 5,
        min: 0
    },
    rateCount: {
        type: Number, 
        min: 0,
        default: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory'
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'brand'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true ,toJSON: {virtuals:true} })

schema.post('init', function(doc){
    if(doc.imgCover || doc.images){
        doc.imgCover = process.env.BASE_URL + 'uploads/' + doc.imgCover;
    doc.images = doc.images?.map(img=>process.env.BASE_URL + 'uploads/' + img)
    }
    
})

schema.virtual('reviews',{
    ref: 'review',
    localField: '_id',
    foreignField: 'product'
})

schema.pre('findOne',function(){
    this.populate('reviews')
})

export const productModel = mongoose.model('product', schema)