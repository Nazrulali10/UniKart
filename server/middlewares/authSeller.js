const jwt = require('jsonwebtoken')

const authSeller =async(req,res,next)=>{
    const sellertoken = req.cookies.sellerjwt
    if(!sellertoken){
        return res.json({sucess:false , message:"seller not authorized"})
    }
    try {
        const tokenDecode = jwt.verify(sellertoken,process.env.JWT_SECRET)
        if(tokenDecode.email===process.env.SELLER_EMAIL){
            
           next()
        }
        else{
              return res.json({success:false , message:"seller not authorized"})
        }
    } catch (error) {
        console.log(error.message)
        return res.json({sucess:false , message:error.message})
    }
}
module.exports = {authSeller}