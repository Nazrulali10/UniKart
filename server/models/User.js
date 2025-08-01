const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,unique:true,required:true},
    cartItems:{type:Object,default:{}}
},{minimize:false})

const User = mongoose.model("User",userSchema)

module.exports = User
