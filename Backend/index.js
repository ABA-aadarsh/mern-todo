require("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const todoRouter=require("./routes/todo")

const connectDatabase=async()=>{
   const res= await mongoose.connect(process.env.DB_URL)
   if(res){
    console.log("Connection to database successful")
   }
}
connectDatabase()             // dont forget to run this function
const app=express()
app.use(cors())
app.use(express.json())

app.use("/",todoRouter.route)



app.listen(8080,()=>{
    console.log("Server active on port : 8080")
})