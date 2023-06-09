import express from 'express'
import bodyParser from 'body-parser';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import adminRoutes from './routes/adminRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import productRoutes from './routes/productRoutes.js'
import queriesRoutes from './routes/queriesRoutes.js'


dotenv.config()
const app = express();

app.use(express.json({limit:'10mb'}))
app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

// DataBase Connection
connectDB();



app.get('/', (req, res) => {
    res.send('Hello welcome to the backend of the softec')
})



app.use('/api/admin', adminRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/product', productRoutes)
app.use('/api/query', queriesRoutes)

const PORT = 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`))