const User = require("../models/User")

const CreateUser=async(req,res)=>{
    const{userName,password,name,email,phone,roles,active}=req.body
    if (!userName || !password || !name){
        return res.status(400).json({message:'username and password are required'})
    }
 
    const user=await User.create({userName,password,name,email,phone,roles,active})
    if (user){
        return res.status(201).json({message:'new user created'})
    }
    else{
        return res.status(400).json({message:'invalid user'})
    }
}
const getUsers=async(req,res)=>{
    const users=await User.find().lean()
    if (!users?.length){
        return res.status(400).json({message:'no tasks found'})
        }
    res.json(users)
}
const updateUser=async (req,res)=>{
    const {id,userName,password,name,email,phone,roles,active}=req.body
    if(!userName || !password || !name){
        return res.status(400).json({message:'username and password are required'}) 
    }
    const user= await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:'username and password are required'}) 
    }
    user.userName=userName
    user.password=password
    user.name=name
    user.email=email
    user.phone=phone
    user.roles=roles
    user.active=active
    const updatedUser=await user.save()
    res.json(updatedUser)
}
const deleteuser=async (req,res)=>{
    const{id}=req.body
    const user=await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:'task required'}) 
    }
    const result=await user.deleteOne()
    const reply=`User '${result.username}' ID ${result.id} deleted`
    res.json(reply)
}
const getbyid=async (req,res)=>{
    const{id}=req.params
    const user=await User.findById(id).lean()
    if(!user){
        return res.status(400).json({message:'user required'}) 
    }
    res.json(`user${user.userName}`)
}

module.exports={    
    CreateUser,
    getUsers,
    updateUser,
    deleteuser,
    getbyid
}