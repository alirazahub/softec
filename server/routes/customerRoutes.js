import express from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import Customer from '../models/customerModel.js';
import { verifyCustomer } from '../middleware/verifyCustomer.js';

const router = express.Router();


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


router.get('/getCustomers', asyncHandler(async (req, res) => {
    const customers = await Customer.find({});
    if (customers) {
        res.status(200).json({ customers })
    } else {
        res.status(400).json({ message: "No customers found" })
    }
}))


router.delete('/deleteCustomer/:id', asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        await customer.remove();
        res.status(200).json({ message: "Customer deleted successfully" })
    } else {
        res.status(400).json({ message: "Customer not found" })
    }
}))


router.put('/updateCustomer/:id', asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
        customer.name = req.body.name || customer.name;
        customer.email = req.body.email || customer.email;
        customer.password = req.body.password || customer.password;
        customer.dateOfBirth = req.body.dateOfBirth || customer.dateOfBirth;
        const updatedCustomer = await customer.save();
        res.status(200).json({ message: "Customer updated successfully", updatedCustomer })
    } else {
        res.status(400).json({ message: "Customer not found" })
    }
}))

router.put('/updateStatus/:id', asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    // if the status is active then make it blocked and vice versa
    if (customer) {
        customer.status = customer.status === "active" ? "blocked" : "active";
        const updatedCustomer = await customer.save();
        res.status(200).json({ message: "Customer updated successfully", updatedCustomer })
    }
    else {
        res.status(400).json({ message: "Customer not found" })
    }
}))

router.put('/placeOrder',verifyCustomer ,asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.customer.id);
    const{products,orderDate,payment}=req.body;
    try {
        if (customer) {
            customer.orders.push({
                products,
                orderDate,
                payment
            })
            await customer.save();
            res.status(200).json({ message: "Order placed successfully"})
        }
        else {
            res.status(400).json({ message: "Customer not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}))


router.put('/addToCart',verifyCustomer ,asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.customer.id);
    const{products}=req.body;
    try {
        if (customer) {
            customer.cart.push({
                products,
            })
            await customer.save();
            res.status(200).json({ message: "Added to cart successfully"})
        }
        else {
            res.status(400).json({ message: "Customer not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}))


router.get('/profile',verifyCustomer, asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.customer.id);
    if (customer) {
        res.status(200).json({ customer })
    } else {
        res.status(400).json({ message: "Customer not found" })
    }
}))




export default router;