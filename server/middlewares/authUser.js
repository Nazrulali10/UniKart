const jwt = require('jsonwebtoken')

const authUser =async(req,res,next)=>{
    const token = req.cookies.jwt
    if(!token){
        return res.json({sucess:false , message:"user not authorized"})
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
            if (!req.body) req.body = {};   
            req.body.userId = tokenDecode.id
            

           next()
        }
        else{
              return res.json({sucess:false , message:"user not authorized"})
        }
    } catch (error) {
        console.log(error.message)
        return res.json({sucess:false , message:error.message})
    }
}
module.exports = {authUser}