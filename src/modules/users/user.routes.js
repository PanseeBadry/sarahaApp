import express from "express";
import { signIn, signUp, verify } from "./user.controller.js";
import { validation } from "../../middleware/validation.js";
import { signInSchema, signUpSchema } from "./user.validator.js";

const userRoutes = express.Router()

userRoutes.post("/signUp",validation(signUpSchema),signUp)
userRoutes.post("/signIn",validation(signInSchema),signIn)
userRoutes.get("/verify/:token",verify)
 
export default userRoutes