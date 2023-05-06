import mongoose from 'mongoose'
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    stock: {
        type: String,
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
    }
}, {
    timestamps: true
}
)

const Product = mongoose.model('Product', productSchema)
export default Product