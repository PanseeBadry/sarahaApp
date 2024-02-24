import { Timestamp } from "bson";
import { timeStamp } from "console";
import { Schema ,model } from "mongoose";
const userSchema = new Schema({
    name : {
        type:String,
        required:true,
        minLength:[3,"name is too short"] 

    },
    email:{
        type:String,
        required : true,
        unique : true
    },
    password:{
        type:String,
        minLength:[4,"password is too short"],
        maxLength :[100,"password is too high"]
    },
    verified : {
        type : Boolean,
        default:false
    }
   

},{
    timestamps:true
})

export const userModel = model("user",userSchema)