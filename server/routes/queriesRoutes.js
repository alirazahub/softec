import express from 'express'
import asyncHandler from 'express-async-handler'
import Query from '../models/queriesModel.js';

const router = express.Router();

// adding a new query
router.post('/addQuery', asyncHandler(async (req, res) => {
    const { user, query, product } = req.body;
    try {
        const queryy = await Query.create({
            user,
            query,
            product,
        })
        if (queryy) {
            res.status(201).json({ message: "Query added successfully" })
        } else {
            res.status(400).json({ message: "Invalid query data" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))


export default router;