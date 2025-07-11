const Product = require('../models/Product');

const cloudinary = require('cloudinary').v2;

const addProduct = async(req,res) =>{
    try {
        let productData = JSON.parse(req.body.productData)
    const images = req.files
    const imagesUrl = await Promise.all(
        images.map(async(item)=>{
        const result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
        return result.secure_url}))
        await Product.create({...productData,images:imagesUrl}) 
        res.json({success:true , message:"product added successfully"})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false , message:error.message})
    }

}

const productList = async(req,res) =>{
  try {
     const products = await Product.find({})
     res.json({success:true , products})
  } catch (error) {
     console.log(error.message)
     return res.json({success:false , message:error.message})
  }
}

const productById =async(req,res)=>{
    try {
        const {id} = req.body
        const product = await Product.findById(id)
        res.json({success:true ,product})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false , message:error.message})
    }
}

const changeStock =async(req,res)=>{
    try {
        const {id,inStock} = req.body
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success:true , message:"stock updated"})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false , message:error.message})
    }
}

module.exports = {addProduct,productList,productById,changeStock}