const jwt=require("jsonwebtoken")
const {User}=require("../model/user")
const fs=require("fs")
const bcrypt=require("bcrypt")
const path=require("path")
exports.signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const hashedPassword=bcrypt.hashSync(password,10)
        const token = jwt.sign({ email }, process.env.PRIVATE_KEY, { algorithm: 'HS256' , expiresIn:60*60*5});
        const user=new User(
            {
                username:username,
                email:email,
                passwordHash:hashedPassword
            }
        )
        const data=await user.save()
        res.status(200).json(
            {
                userId:data._id,
                token:token
            }
        )
    }catch(err){
        res.status(405).send("Signup failed")
    }
}
exports.verify=async(req,res)=>{
    try{

        const token=req.get("authorization").split("Bearer ")[1]

        console.log(token)
        const data=jwt.verify(token,process.env.PRIVATE_KEY)
        let userInfo
        if(data){
            userInfo=await User.findOne({email:data.email})
        }
        if(data && userInfo){
            res.status(206).send("good to go")
        }else{
            res.status(404).send("User not Authorised")
        }
    }catch(err){
        console.log(err)
        res.status(403).send("User not Authorised")
    }
}


exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const data=await User.findOne(
            {
                email:email
            }
        ).exec()
        console.log(data)
        const isAuth=bcrypt.compareSync(password,data.passwordHash)
        if(data && isAuth){
            const token = jwt.sign({ email }, process.env.PRIVATE_KEY, { algorithm: 'HS256' , expiresIn:60*60*5});
            res.status(201).json(
                {
                    userId:data._id,
                    token:token
                }
            )
        }else{
            res.status(403).send("Create Account First")
        }
    }catch(err){
        res.status(405).send("Login Failed")
    }
}