require("dotenv").config()
const express = require("express")//יכולת להקמת שרת
const cors =require("cors")//רשימה לבנה מי יכול להתחבר
//connecting to database
const corsOptions= require("./config/corsoptions")
const connectDB=require("./config/dbConn")
const mongoose = require("mongoose")
const PORT = process.env.PORT ||7001
const app=express()
//mongodb://localhost:27017
//mongodb://srv1:27017/2023_214429763_node
connectDB()
app.use(cors(corsOptions))//mw
app.use(express.json())//mw
app.use(express.static("public"))//לקבצים סטטיים-תמונות...  //mw

app.use("/api/books",require("./routes/book"))
app.use("/api/users",require("./routes/user"))
app.use("/api/auths",require("./routes/auth"))
app.use("/api/carts",require("./routes/cart"))
//דף הבית
app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

mongoose.connection.once('open',()=>{
    console.log("CONNECTED TO MONGO")
    app.listen(PORT,()=>{
        console.log(`server is running on port${PORT}`)
    })
})
    mongoose.connection.on('error',err=>{
        console.log(err)
    })


