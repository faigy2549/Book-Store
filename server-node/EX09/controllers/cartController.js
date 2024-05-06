const Cart = require("../models/Cart")

const CreateCart=async(req,res)=>{
    const{book,quantity}=req.body
    const existingBook = await Cart.findOne({book:book,user:req.user._id }).exec()
    console.log(existingBook)
    if (existingBook) {
        existingBook.quantity = existingBook.quantity +1
        await existingBook.save()
        return res.status(201).json({ message: "Book quantity updated" });
      }
     else{
      const cart=await Cart.create({book,user:req.user._id,quantity}) 
    if (cart){
    return res.status(201).json({message:'new cart created'})
    }
    else{
        return res.status(400).json({message:'invalid user'})
    }
}
}
const getCartbyId=async(req,res)=>{
    const carts=await Cart.find({user:req.user._id}).populate("book",{}).lean()
    if (!carts){
        return res.status(400).json({message:'wrong user'})
        }
    res.json(carts)
}
const updateCart=async (req,res)=>{
    const{id,book,quantity}=req.body
    const cart= await Cart.findById(id).exec()
    if(!cart){
        return res.status(400).json({message:'no such cart'}) 
    }
    cart.book=book
    cart.quantity=quantity

    const updatedCart=await cart.save()
    res.json(updatedCart)
}
const deleteFromCart=async (req,res)=>{
    const{id}=req.body
    const c=await Cart.findById(id).exec()
    if(!c){
        return res.status(400).json({message:'no such product'}) 
    }
    console.log(c)
    
    const result=await c.deleteOne()
    const reply=` '${result.book}'  deleted`
    res.json(reply)
}
//updateCart,
module.exports={  
    CreateCart,  
    getCartbyId,
    updateCart,
    deleteFromCart
}
