import mongoose from 'mongoose'
const customerSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
    },
    orders: [{
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                }
            }
        ],
        orderStatus: {
            type: String,
            default: 'pending'
        },
        orderDate: {
            type: String,
        },
        payment: {
            paymentStatus: {
                type: String,
            },
            paymentDate: {
                type: String,
            },
            cardNumber: {
                type: Number,
            },
            cardHolderName: {
                type: String,
            },
        }
    }],
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
        },
    }],
    wishlist: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    }],
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true
}
)

const Customer = mongoose.model('Customer', customerSchema)
export default Customer