import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';
import { verifyCustomer } from '../middleware/verifyCustomer.js';
import Customer from '../models/customerModel.js';
import { ObjectId } from 'mongodb';

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

// deleting a product
router.delete('/deleteProduct/:prodId', asyncHandler(async (req, res) => {
    const prodId = req.params.prodId;
    try {
        await Product.deleteOne({ _id: prodId })
        res.status(200).json({ message: "Product deleted successfully" })
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
            const alreadyReviewed = product.reviews.find(r => r.user._id.toString() === req.user.id.toString());
            if (alreadyReviewed) {
                res.status(400).json({ message: "You already reviewed the product" })
            } else {
                const revieww = {
                    user: req.user.id,
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

// getting all products with ratings, reviews ,and is in the wishlist of current user or not
router.get('/getAllProducts', verifyCustomer, asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        if (products) {
            const user = await Customer.findOne({ _id: req.user.id })
            const productsWithRating = products.map(product => {
                const isWishlisted = user.wishlist.includes(req.user.id)
                return {
                    _id: product._id,
                    title: product.title,
                    stock: product.stock,
                    description: product.description,
                    marketPrice: product.marketPrice,
                    sellingPrice: product.sellingPrice,
                    image: product.image,
                    inventory: product.inventory,
                    minimumAge: product.minimumAge,
                    rating: product.rating,
                    numReviews: product.numReviews,
                    reviews: product.reviews,
                    isWishlisted: isWishlisted
                }
            })
            res.status(200).json(productsWithRating)
        } else {
            res.status(400).json({ message: "No products found" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))

// get all products only
router.get('/getAllProductsOnly', asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        if (products) {
            res.status(200).json(products)
        } else {
            res.status(400).json({ message: "No products found" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))


// add to wishlist if not already added and remove from wishlist if already added
router.post('/addToWishlist/:prodId', verifyCustomer, asyncHandler(async (req, res) => {
    const prodId = req.params.prodId;
    try {
        const product = await Product.findById(prodId)
        if (product) {
            const user = await Customer.findById(req.user.id)
            if (user) {
                const wishlist = user.wishlist;
                function checkIfExists(id) {
                    const objectId = new ObjectId(id);
                    const result = wishlist.find(item => item._id.equals(objectId));
                    return Boolean(result);
                }
                const exists = checkIfExists(prodId);
                if (exists) {
                    const index = user.wishlist.indexOf(prodId)
                    user.wishlist.splice(index, 1)
                    await user.save()
                    res.status(200).json({ message: "Removed from wishlist" })
                } else {
                    user.wishlist.push(prodId)
                    await user.save()
                    res.status(200).json({ message: "Added to wishlist" })
                }
            }
        } else {
            res.status(400).json({ message: "No product found" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))

// get all products and ratings
router.get('/getAllProductsAndRatings', asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        if (products) {
            const productsWithRating = products.map(product => {
                return {
                    _id: product._id,
                    title: product.title,
                    stock: product.stock,
                    description: product.description,
                    marketPrice: product.marketPrice,
                    sellingPrice: product.sellingPrice,
                    image: product.image,
                    inventory: product.inventory,
                    minimumAge: product.minimumAge,
                    rating: product.rating,
                    numReviews: product.numReviews,
                    reviews: product.reviews
                }
            })
            res.status(200).json(productsWithRating)
        } else {
            res.status(400).json({ message: "No products found" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))


export default router;