const mongoose=require("mongoose")
const {Schema}=mongoose
const schema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        completeStatus:{
            type:Boolean,
            default:false
        },
        // user:{
        //     type:String,
        //     required:true
        // }
    }
)

exports.Todo=mongoose.model("Todo",schema)
