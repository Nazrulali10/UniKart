const User = require("../models/User")


const updateCart = async(req,res)=>{
    try {
        const {userId,cartItems} = req.body
        await User.findByIdAndUpdate(userId,{cartItems})
        

        res.json({success:true , message:"cart updated successfully"})
    } catch (error) {
         console.log(error.message)
        return res.json({success:false , message:error.message})
    }

}

module.exports = {updateCart}