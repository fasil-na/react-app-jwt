import express from 'express'


import { LoginPost, ProfileDetailsGet, Register } from '../controller/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';


const userRoute = express.Router();

userRoute.post("/register", Register);
userRoute.post("/login", LoginPost);
userRoute.get("/getProfileDetails", verifyToken, ProfileDetailsGet);

export default userRoute;
