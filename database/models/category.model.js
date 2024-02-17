import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name'],
        maxLength: [150, 'too long category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    image: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })

schema.post('init', function(doc){
    if(doc.image){
        doc.image = process.env.BASE_URL + 'uploads/' + doc.image
    }
    
})

export const categoryModel = mongoose.model('category', schema)