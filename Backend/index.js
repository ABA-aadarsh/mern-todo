require("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const todoRouter=require("./routes/todo")
const userRouter=require("./routes/auth")
const jwt=require("jsonwebtoken")

const connectDatabase=async()=>{
   const res= await mongoose.connect(process.env.DB_URL)
   if(res){
    console.log("Connection to database successful")
   }
}
const authenticate=(req,res,next)=>{
    try{
        const token=req.get("authorization").split("Bearer ")[1]
        const data=jwt.verify(token,process.env.PRIVATE_KEY)
        if(data){
            req.email=data.email
            next()
        }else{
            res.status(403).send("User not Authorised")
        }
    }catch(err){
        res.status(403).send("User not Authorised")
    }
}
connectDatabase()             // dont forget to run this function
const app=express()
app.use(cors())
app.use(express.json())

app.use("/auth",userRouter.route)
app.use("/todo",authenticate,todoRouter.route)


app.listen(8080,()=>{
    console.log("Server active on port : 8080")
})