const jwt = require('jsonwebtoken')


const sellerLogin = async(req,res) =>{
  try {
    const {email , password} = req.body
    
    if(email==process.env.SELLER_EMAIL || password ==process.env.SELLER_PASSWORD){
     
      const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'})

    res.cookie("sellerjwt",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:process.env.NODE_ENV === "production"?"none":"strict",
        secure:process.env.NODE_ENV === "production",
    })
     return res.json({success:true , message:"seller logged in successfully"})
    }
    else{
        return res.json({success:false , message:"invalid credentials"})
    }
  } catch (error) {
    console.log(error.message)
     return res.json({success:false , message:error.message})
  }
}

const checkSellerAuth = async(req,res)=>{
  try { 
   return res.json({success:true})
  } catch (error) {
     console.log(error.message)
     return res.json({success:false , message:error.message})
  }
}

const sellerLogout = async(req,res)=>{
  try {
    res.clearCookie("sellerjwt",{
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

module.exports={sellerLogin,sellerLogout,checkSellerAuth}