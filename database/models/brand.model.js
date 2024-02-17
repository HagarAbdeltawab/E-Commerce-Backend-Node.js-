import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short brand name'],
        maxLength: [150, 'too long brand name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    logo: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })

schema.post('init', function(doc){
    if(doc.logo){
        doc.logo = process.env.BASE_URL + 'uploads/' + doc.logo
    }
})

export const brandModel = mongoose.model('brand', schema)