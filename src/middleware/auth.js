
import  jwt  from "jsonwebtoken"
export const auth = (req,res,next)=>{
let token=req.header('token')
jwt.verify(token,process.env.SECRET_KEY,(err,decodded)=>{
    if(err){
        res.json({message:"err",err})
    }else{
        req.userId =decodded.id
        next()
    }
})

}
