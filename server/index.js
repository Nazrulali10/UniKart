const express = require('express')
const App = express()
const PORT = process.env.PORT || 4000
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./configs/mongoose.js')
const router = require('./routes/userRoutes.js')
const sellerrouter = require('./routes/sellerRoutes.js')
const connectCloudinary  = require('./configs/cloudinary.js')
const productrouter = require('./routes/productRoutes.js')
const cartrouter = require('./routes/cartRoutes.js')
const addressrouter = require('./routes/address.Routes.js')
const orderrouter = require('./routes/orderRoutes.js')




const allowedOrigins = ['http://localhost:5173','https://unikart-client.vercel.app']
App.use(cors({
    origin: allowedOrigins,
    credentials:true
}))

App.use(cookieParser())
App.use(express.json({ limit: '50mb' }))
App.use(express.urlencoded({ limit: '50mb', extended: true }));


dotenv.config()

App.get("/",(req,res)=>{
    res.send("its working")
})
App.use('/api/user',router)
App.use('/api/seller',sellerrouter)
App.use('/api/product',productrouter)
App.use('/api/cart',cartrouter)
App.use('/api/address',addressrouter)
App.use('/api/orders',orderrouter)

const starting = async()=>{
    try {
  await connectDB();
  await connectCloudinary();
  console.log('✅ DB and Cloudinary connected');
} catch (err) {
  console.error('❌ Startup error:', err);
  throw err; // This causes the function to crash with a clear error log
}
}

starting()



// App.listen(PORT,()=>{
//     console.log(`server is running on ${PORT}`)
    
// })
module.exports = App;
 