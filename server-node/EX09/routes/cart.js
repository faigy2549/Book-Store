const cartController=require ("../controllers/cartController")
const express = require("express")
const router = express.Router()
const Cart =require("../models/Cart")
const verifyJWT=require("../middleware/verifyJWT")
router.use(verifyJWT)
router.post("/",cartController.CreateCart)
router.get("/",cartController.getCartbyId)
router.put("/",cartController.updateCart)
router.delete("/",cartController.deleteFromCart)

module.exports=router