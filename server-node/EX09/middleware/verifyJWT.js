const jwt=require('jsonWebToken')
const verifyJWT=(req,res,next)=>{
const authHeader=req.headers.authorization||req.Headers.Authorization

if(!authHeader?.startsWith('Bearer ')){
    return res.status(401).json({message:'Unautharized'})
}
const token=authHeader.split(' ')[1]

jwt.verify(
  token,
  process.env.ACCESS_TOKEN_SECRET,
  (err,decoded)=>{
    if(err)   return res.status(403).json({message: 'forbidden'})
    req.user=decoded
    next()
  }  
)
}
module.exports=verifyJWT