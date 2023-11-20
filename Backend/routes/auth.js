const express=require("express")
const route=express.Router()
const {signup,login,verify}=require("../controller/auth")
route
.post("/login",login)
.post("/signup",signup)
.post("/verify",verify)

exports.route=route