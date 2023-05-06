import express from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import Admin from '../models/adminModel.js'

const router = express.Router();

//adding  new admin
router.post('/addAdmin', asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    try {
        const user = await Admin.findOne({ email });
        if (user) {
            res.status(400).json({ message: "Admin Already Exists!" })
        } else {
            await Admin.create({ name, email, password })
            res.status(201).json({ message: "Admin Registered Successfully!" })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}))

//admin login
router.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await Admin.findOne({
                email,
                password
            })
            if (user) {
                const adminToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_ADMIN, {
                    expiresIn: '30d'
                })
                res.cookie('adminToken', adminToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                })
                res.status(201).json({ user, adminToken })
                
            } else {
                res.status(400).json({ message: "Invalid Email or Password!" })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    })
)


export default router;