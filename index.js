import dotenv from 'dotenv'
dotenv.config({})
import express from 'express'
import { connection } from './dataBase/connection.js'
import userRoutes from './src/modules/users/user.routes.js'
import messageRoutes from './src/modules/messages/message.routes.js'
import { AppError } from './src/utilis/AppError.js'
import { globalError } from './src/utilis/globalErrorHandle.js'

const app = express()
const port = 3000
connection()
app.use(express.json())

app.use(userRoutes)
app.use(messageRoutes)
app.use("*",(req,res,next)=>{
    
   next(new AppError(`invalid url ${req.originalUrl} `,404)) 
})

//global error handle
app.use(globalError)
app.listen(port, ()=> console.log(`listening at http://localhost:3000`))