const Book = require("../models/Book")

const CreateBook=async(req,res)=>{
    const{image,name,code,author, price,language,type,popular}=req.body
    console.log(req.user)
    if (!name || !code || !price){
        return res.status(400).json({message:'name,code and price are required'})
    }
    const book=await Book.create({image,name,code,author, price,language,type,popular})
    if (book){
        return res.status(201).json({message:'new book created'})
    }
    else{
        return res.status(400).json({message:'invalid book'})
    }
}
const getBooks=async(req,res)=>{
    const books=await Book.find().lean()
    if (!books?.length){
        return res.status(400).json({message:'no books found'})
        }
        res.json(books)
}
const updateBook=async (req,res)=>{
    const {image,name,code,author, price,language,type,popular}=req.body

    if(!code||!name||!price){
        return res.status(400).json({message:'name,code and price are required'}) 
    }
    const book= await Book.findOne({code}).exec()
    if (code != book.code) {
        const existingBook = await Book.findOne({ code }).exec();
        if (existingBook) {
          return res.status(400).json({ message: 'code already exists' });
        }
      }
    if(!book){
        return res.status(400).json({message:'book not found'}) 
    }
    book.image=image
    book.name=name
    book.code=code
    book.author=author
    book.price=price
    book.language=language
    book.type=type
    book.popular=popular
    const updatedbook=await book.save()
    res.json(`'${updatedbook.name}' updated`)
}
const deleteBook=async (req,res)=>{
    const{code}=req.body
    console.log(code);
    const book=await Book.findById(code).exec()
    if(!book){
        return res.status(400).json({message:'book not found'}) 
    }
    const result=await book.deleteOne()
    const reply=`Book '${result.name}' CODE ${result.code} deleted`
    res.json(reply)
}
const getBooksByType=async(req,res)=>{
    const {type}=req.params
    const books=await Book.find({type:type}).lean()
    if (!books?.length){
        return res.status(400).json({message:'no books found'})
        }
        res.json(books)
}


module.exports={    
    CreateBook,
    getBooks,
    updateBook,
    deleteBook,
    getBooksByType,
}
