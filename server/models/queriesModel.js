import mongoose from 'mongoose'
const querySchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    query:{
        type: String,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    status:{
        type: String,
        default: 'Pending'
    }
}, {
    timestamps: true
}
)

const Query = mongoose.model('Query', querySchema)
export default Query