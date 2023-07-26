import express from 'express'
import multer from 'multer';

import { LoginPost, ProfileDetailsGet, Register, profileImageEdit } from '../controller/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { clientDelete, clientListGet, clientUpdate } from '../controller/adminController.js';


const userRoute = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware function to handle file uploads
const uploadFile = upload.single("image");


userRoute.post("/register", Register);
userRoute.post("/login", LoginPost);
userRoute.get("/getProfileDetails", verifyToken, ProfileDetailsGet);
userRoute.post("/profile_image_edit", verifyToken, uploadFile, profileImageEdit);
userRoute.get("/getClientList", verifyToken, clientListGet);
userRoute.delete("/delete-client/:id", verifyToken, clientDelete);
userRoute.put("/update-client/:id", verifyToken, clientUpdate);





export default userRoute;
