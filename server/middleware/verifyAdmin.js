import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export const verifyAdmin = (req, res, next) => {
    const token = req.header('adminToken');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        req.admin = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
}