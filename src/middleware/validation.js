export function validation(schema){
    return (req,res,next)=>{
        let {error} = schema.validate(req.body)
        if(!error){
            next()
        }else{
            res.json({message:"error in data",error:error.details})
        }
    }
}