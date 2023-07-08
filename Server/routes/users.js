import express from 'express'


import { LoginPost, Register } from '../controller/userController.js';


const userRoute = express.Router();

userRoute.post("/register", Register);
userRoute.post("/login", LoginPost);

export default userRoute;
