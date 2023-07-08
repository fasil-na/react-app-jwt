
import express from 'express'


import { adminLogin } from '../controller/adminController.js';


const adminRoute = express.Router();

// userRoute.post("/register", Register);
adminRoute.post("/login", adminLogin);

export default adminRoute;
