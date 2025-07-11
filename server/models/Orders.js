const mongoose = require('mongoose')
const ordersSchema = new mongoose.Schema({
    userId:{type:String , required:true , ref:'User'},
    items:[{
        product:{type:String , required:true , ref:'Product'},
        quantity:{type:Number , required:true}
    }],
    amount:{type:Number, required:true},
    address:{type:String , required:true , ref:'Address'},
    status:{type:String , required:true , default:'Order placed'},
    paymenttype:{type:String , default:'COD', required:true},
    isPaid:{type:Boolean,default:false}
},{timestamps:true})

const Orders = mongoose.model("Orders",ordersSchema)
module.exports = Orders