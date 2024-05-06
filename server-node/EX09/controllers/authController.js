
const bcrypt=require('bcrypt')
const User=require("../models/User")
const jwt=require('jsonwebtoken')
const login=async(req,res)=>{
const {userName,password}=req.body
if(!userName||!password){
    return res.status(400).json({message:'all fields required'})
} 
const foundUser=await User.findOne({userName}).lean()
if(!foundUser/*||!foundUser.active*/){
    return res.status(401).json({message:`unautharized`})
}
const match=await bcrypt.compare(password,foundUser.password)
if(!match) return res.status(401).json({message:`unautharized`})
const userinfo={_id:foundUser._id,name:foundUser.name,roles:foundUser.roles,userName:foundUser.userName,email:foundUser.email}
const accesstoken=
jwt.sign(userinfo,process.env.ACCESS_TOKEN_SECRET)
res.json({accesstoken:accesstoken})
}




const register=async(req,res)=>{
const {userName,password,name,email,phone}=req.body
if(!name||!userName||!password){
    return res.status(400).json({message:'all fields required'})
}
const duplicate=await User.findOne({userName:userName}).lean()
if(duplicate){
    return res.status(409).json({message:'duplicate username'})
}
const hashedpwd=await bcrypt.hash(password,10)
const userObject={userName,password:hashedpwd,name,email,phone}
const user=await User.create(userObject)
if(user){
return res.status(201).json({message:`new user ${user.userName} created`})
}
else{
    return res.status(400).json({message:`invalid user recieved`})
}
}

module.exports={login,register}