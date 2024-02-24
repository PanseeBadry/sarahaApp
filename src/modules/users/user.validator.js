import Joi from "joi"
const signUpSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({tlds:{allow:['com', 'net','pro'] } }).required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    repeat_password: Joi.ref('password')
})



const signInSchema = Joi.object({
    email: Joi.string().email({tlds:{allow:['com', 'net','pro'] } }).required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

  
})
export {
    signUpSchema,signInSchema
}