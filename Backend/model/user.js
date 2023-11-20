const mongoose=require("mongoose")
const {Schema}=mongoose
const schema=new Schema(
    {
        username:{type:String,default:"User"},
        email:{
            type:String,
            unique:true,
            required:true,
            validate: {
                validator: function (value) {
                  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Invalid email address format'
            }
        },
        passwordHash:{
            type:String,
            reuired:true
        },
        token:{
            type:String
        }
    }
)

exports.User=mongoose.model("User",schema)
