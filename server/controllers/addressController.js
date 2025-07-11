const Address = require("../models/Address")



const addAddress = async(req,res)=>{
    try {
        const {userId , address} = req.body
        await Address.create({...address,userId})
        res.json({success:true , message:"address added successfull"})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false , message:error.message})
    }
}

const getAddress = async(req,res)=>{
    try {
        const {userId} = req.body
        const addresses = await Address.find({userId})
        res.json({success:true , addresses})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false , message:error.message})
    }
}

module.exports ={addAddress,getAddress}