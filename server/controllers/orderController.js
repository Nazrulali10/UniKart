const Orders = require("../models/Orders")
const Product = require("../models/Product")



const placeOrderCOD = async(req,res)=>{
    try {
        const {address,userId,items} = req.body
        if(!address || items.length==0){
            return res.json({success:false , message:"missing details cod"})
        }
        let amount = await items.reduce(async(acc,item)=>{
        const product = await Product.findById(item.product)
        return (await acc)+product.offerPrice*item.quantity
        },0)
        amount+=Math.floor(amount*0.2)
        await Orders.create({
            userId,
            items,
            amount,
            address,
            paymenttype:"COD"
        })
        return res.json({success:true , message:"order placed successfull"})
    } catch (error) {
         return res.json({success:false , message:error.message})
    }}

const getUserOrders = async(req,res)=>{
    try {
        const {userId} = req.body
    const orders = await Orders.find({
        userId,
        $or:[{paymenttype:"COD"},{isPaid:true}]
    }).populate("items.product address").sort({createdAt:-1})
    res.json({success:true , orders})
    } catch (error) {
        return res.json({success:false , message:error.message})
    }

}

const getAllOrders = async(req,res)=>{
    try {
    const orders = await Orders.find({
        $or:[{paymenttype:"COD"},{isPaid:true}]
    }).populate("items.product address").sort({createdAt:-1})
    res.json({success:true , orders})
    } catch (error) {
        return res.json({success:false , message:error.message})
    }

}
    
module.exports = {placeOrderCOD,getAllOrders,getUserOrders}