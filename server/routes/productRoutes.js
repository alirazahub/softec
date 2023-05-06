import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';
import {verifyCustomer }from '../middleware/verifyCustomer.js';

const router = express.Router();

// adding a new product
router.post('/addProduct', asyncHandler(async (req, res) => {
    const { title, stock, description, marketPrice, sellingPrice, image, inventory, minimumAge } = req.body;
    try {
        const product = await Product.create({
            title,
            stock,
            description,
            marketPrice,
            sellingPrice,
            image,
            inventory,
            minimumAge
        })
        if (product) {
            res.status(201).json({ message: "Product added successfully" })
        } else {
            res.status(400).json({ message: "Invalid product data" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))

// getting all products with reviews and ratings
router.get('/getProducts', asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).populate('reviews.user', 'name')
        if (products) {
            res.status(201).json(products)
        } else {
            res.status(400).json({ message: "Invalid product data" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))


// adding revwing and rating to a product
router.post('/addReview/:prodId', verifyCustomer, asyncHandler(async (req, res) => {
    const { rating, review } = req.body;
    const prodId = req.params.prodId;
    try {
        const product = await Product.findOne({ _id: prodId })
        if (product) {
            console.log(req.user._id)
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
            if (alreadyReviewed) {
                res.status(400).json({ message: "You already reviewed the product" })
            } else {
                const revieww = {
                    user: req.user._id,
                    review: review,
                    rating: Number(rating)
                }
                product.reviews.push(revieww)
                product.numReviews = product.reviews.length
                product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
                await product.save()
                res.status(201).json({ message: "Review added successfully" })
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))

export default router;