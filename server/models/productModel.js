import mongoose from 'mongoose'
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    marketPrice: {
        type: Number,
    },
    sellingPrice: {
        type: Number,
    },
    image: {
        type: String,
    },
    inventory:{
        type: String,
    },
    minimumAge:{
        type: String,
    },
    reviews: [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        review: {
            type: String,
        },
        rating: {
            type: Number,
        }
            
    }],
}, {
    timestamps: true
}
)

const Product = mongoose.model('Product', productSchema)
export default Product