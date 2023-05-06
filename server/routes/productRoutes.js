import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';

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





export default router;