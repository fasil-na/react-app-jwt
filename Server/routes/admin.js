
import express from 'express'


import { clientListGet } from '../controller/adminController.js';
import { verifyToken } from '../middleware/verifyToken.js';


const adminRoute = express.Router();

// userRoute.post("/register", Register);
// adminRoute.post("/login", adminLogin);
adminRoute.post("/getClientList", verifyToken, clientListGet);

export default adminRoute;
