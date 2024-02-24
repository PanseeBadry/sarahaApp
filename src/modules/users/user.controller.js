import jwt from "jsonwebtoken";
import { userModel } from "../../../dataBase/models/user.model.js";
import bcrypt from 'bcrypt'
import { sendEmail } from "../../email/sendEmail.js";
import { handleAsyncError } from "../../middleware/handleError.js";
import { AppError } from "../../utilis/AppError.js";






export const signUp = handleAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;


    let found = await userModel.findOne({ email });
    if (found) return next(new AppError('email already exist', 409))
    let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS))

    let addedUser = await userModel.insertMany({ name, email, password: hashedPassword });
    let verifyToken = jwt.sign({ id: addedUser[0]._id }, process.env.VERIFY_SECRET)
    sendEmail({ email, api: `http://localhost:3000/verify/${verifyToken}` })

    res.json({ message: "success", addedUser })
    



})
export const signIn = handleAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

        let user = await userModel.findOne({ email })
        if (user) {
            if (user.verified) {
                let matched = await bcrypt.compare(password, user.password);
                if (matched) {
                    let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
                    res.json({ message: "signIn successfully", token })
    
                } else {
                    // res.json({message:"wrong password"})
                    next(new AppError(`wrong password`, 400))
                }
            } else {
                // res.json({message:"user must be verified"})
                next(new AppError(`user must be verified`, 400))
            }
        } else {
            // res.json({message:"user not found"})
            next(new AppError(`user not found`, 404))
        }


})
export const verify = handleAsyncError(async (req, res, next) => {
    let { token } = req.params
    jwt.verify(token, process.env.VERIFY_SECRET, async (err, decodded) => {
        if (err) return next(new AppError(`verify error`, 404))
        let updatedUser = await userModel.findByIdAndUpdate(decodded.id, { verified: true }, { new: true })
        res.json({ message: "success", updatedUser })
    })
})
