
import { messageModel } from '../../../dataBase/models/message.model.js'
import { userModel } from '../../../dataBase/models/user.model.js'
import { handleAsyncError } from '../../middleware/handleError.js'

export const addMessage = handleAsyncError(async(req,res)=>{
    const {textMessage , receivedId} = req.body
    let found = await userModel.findById(receivedId)
    if(!found) return res.json({message:"user not found"}) 
    let addedMessage = await messageModel.insertMany({textMessage,receivedId})
    res.json({message : "success",addedMessage})
})

export const userMessages = handleAsyncError( async (req,res)=>{
    
    let messages = await messageModel.find({receivedId:req.userId})
    res.json(messages)
})
