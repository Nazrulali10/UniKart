const mongoose = require('mongoose')

const connectDB = async() =>{
try {
    mongoose.connection.on("connected",()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    
} catch (error) {
    console.log("error in connecting db")
}
}

module.exports = connectDB