import express from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import Customer from '../models/customerModel.js';

const router = express.Router();

// add a new customer
router.post('/addCustomer', asyncHandler(async (req, res) => {
    const { name, email, password, dateOfBirth, gender } = req.body;
    const alreadyUser = await Customer.findOne({ email });
    if (alreadyUser) {
        res.status(400).json({ message: "User already exists" })
    }
    try {
        const customer = await Customer.create({
            name,
            email,
            password,
            dateOfBirth,
            gender,
        })
        if (customer) {
            res.status(201).json({ message: "Customer added successfully" })
        } else {
            res.status(400).json({ message: "Invalid customer data" })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}))

// login customer
router.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await Customer.findOne({
                email,
                password
            })
            if (user) {
                const customerToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '30d'
                })
                res.cookie('customerToken', customerToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                })
                res.status(201).json({ user, customerToken })
                
            } else {
                res.status(400).json({ message: "Invalid Email or Password!" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })
)
// get all customers
router.get('/getCustomers', asyncHandler(async (req, res) => {
    const customers = await Customer.find({});
    if (customers) {
        res.status(200).json({ customers })
    } else {
        res.status(400).json({ message: "No customers found" })
    }
}))

//


export default router;