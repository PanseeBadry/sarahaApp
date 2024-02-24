import express from 'express'
import { addMessage, userMessages } from './message.controller.js'
import { auth } from '../../middleware/auth.js'
const messageRoutes = express.Router()
messageRoutes.post("/addMessage",addMessage)
messageRoutes.get("/userMessages",auth,userMessages)


export default messageRoutes