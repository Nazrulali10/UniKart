const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const Register = async(req,res)=>{
  try {
      const {name,email,password} = req.body 
    if(!name || !email || !password){
       return res.json({success:false , message:"missing details"})
    }
    const userExists = await User.findOne({email})
    if(userExists){
       return res.json({success:false , message:"user already exists"})
    }
    const HashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({name,email,password:HashedPassword})
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:process.env.NODE_ENV === "production"?"none":"strict",
        secure:process.env.NODE_ENV === "production",
    })
    return res.json({success:true , user})
  } catch (error) {
    console.log(error.message)
    return res.json({success:false , message:error.message})
  }
}

const Login = async(req,res) =>{
  try {
    const {email , password} = req.body
    const user = await User.findOne({email})
    if(!email || !password){
      return res.json({success:false , message:"missing credentials"})
    }
    if(!user){
      return res.json({success:false , message:"user does not exists"})
    }
    const passwordMatched = await bcrypt.compare(password,user.password)
    if(!passwordMatched){
       return res.json({success:false , message:"invalid credentials"})
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:process.env.NODE_ENV === "production"?"none":"strict",
        secure:process.env.NODE_ENV === "production",
    })
    return res.json({success:true , message:"login successfull" , user})

  } catch (error) {
    console.log(error.message)
     return res.json({success:false , message:error.message})
  }
}

const checkAuth = async(req,res)=>{
  try {
   const{ userId } = req.body
   const user = await User.findById(userId).select("-password")
   

   return res.json({success:true , user})
  } catch (error) {
     console.log(error.message)
     return res.json({success:false , message:error.message})
  }
}

const Logout = async(req,res)=>{
  try {
    res.clearCookie("jwt",{
       httpOnly:true,
        sameSite:process.env.NODE_ENV === "production"?"none":"strict",
        secure:process.env.NODE_ENV === "production",
    })
    return res.json({success:true , message:"logged out successfull"})
  } catch (error) {
     console.log(error.message)
     return res.json({success:false , message:error.message})
  }
}

module.exports = {Register,Login,checkAuth,Logout}