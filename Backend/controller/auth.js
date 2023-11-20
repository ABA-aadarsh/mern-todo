const jwt=require("jsonwebtoken")
const {User}=require("../model/user")
const fs=require("fs")
const path=require("path")
const privateKey=fs.readFileSync(path.resolve(__dirname,"../private.key"),"utf-8")
exports.signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const token = jwt.sign({ email }, process.env.PRIVATE_KEY, { algorithm: 'HS256' , expiresIn:60*60*5});
        const user=new User(
            {
                username:username,
                email:email,
                passwordHash:password,
                token:token
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
        const data=jwt.verify(token,process.env.PRIVATE_KEY)
        if(data){
            res.status(206).send("good to go")
        }else{
            res.status(403).send("User not Authorised")
        }
    }catch(err){
        res.status(403).send("User not Authorised")
    }
}
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const data=await User.findOne(
            {
                email:email,
                passwordHash:password
            }
        ).exec()
        if(data){
            res.status(201).json(
                {
                    userId:data._id,
                    token:data.token
                }
            )
        }else{
            res.status(403).send("Create Account First")
        }
    }catch(err){
        res.status(405).send("Login Failed")
    }
}