
import { Schema ,Types,model } from "mongoose";
const messageSchema = new Schema({
    textMessage : {
        type:String,
        required:true,
        minLength:[3,"name is too short"] 

    },
    receivedId : {
        type:Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})

export const messageModel = model("message",messageSchema)