
import bcrypt from 'bcrypt'
import User from '../models/userSchema.js'
import { generateAuthToken } from '../middleware/auth.js';
import fs from 'fs';

// const adminCredentials = {
//     email: "admin@gmail.com",
//     password: "123",
// }

export const Register = async (req, res, next) => {
    try {
        const userDetails = req.body;
        const user = await User.find({ email: userDetails.email });
        if (user.length === 0) {
            userDetails.password = await bcrypt.hash(userDetails.password, 10);
            User.create({
                name: userDetails.name,
                email: userDetails.email,
                phone: userDetails.phone,
                password: userDetails.password,
            })
            res.json({ status: true, result: userDetails });
        } else {
            return res.json({ error: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const LoginPost = async (req, res, next) => {
    let userSignUp = {
        Status: false,
        message: null,
        token: null,
        name: null,
        isAdmin: null
    };


    try {
        const userDetails = req.body;
        const userExist = await User.findOne({ email: userDetails.email });
        if (userExist) {
            const isMatch = await bcrypt.compare(userDetails.password, userExist.password);
            if (isMatch === true) {
                const token = generateAuthToken(userExist);
                const name = userExist.name;
                userSignUp.Status = true;
                userSignUp.message = "You are logged";
                userSignUp.token = token;
                userSignUp.name = userExist.name;
                userSignUp.isAdmin = userExist.isAdmin

                const obj = {
                    token,
                    name,
                };

                res.cookie("jwt", obj, {
                    httpOnly: false,
                })
                    .status(200)
                    .send({ userSignUp });

            } else {
                userSignUp.Status = false;
                userSignUp.message = "Please enter correct Password";
                res.send({ userSignUp });
            }
        } else {
            userSignUp.Status = false;
            userSignUp.message = "Please enter correct Email";
            res.send({ userSignUp });
        }

    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }



};

export const ProfileDetailsGet = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Fetch the user document from the database with populated image field
        const user = await User.findById(userId).populate('image');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract the image data from the user object
        const imageData = user.image;
        const imageUrl = `/images/${imageData}`;

        // Create a modified user object to send in the response
        const modifiedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            imageUrl: imageUrl
        };

        // Send the modified user object in the response
        res.json(modifiedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};



export const profileImageEdit = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image provided" });
    }
    const id = req.user._id;

    try {
        const { originalname, buffer, path } = req.file;
        const fileExtension = originalname.split('.').pop();
        const fileName = `image_${id}.${fileExtension}`; // Customize the file name as desired
        const filePath = `public/images/${fileName}`;
        await User.updateOne({ _id: id }, {
            $set: {
                image: fileName
            }
        });

        fs.writeFileSync(filePath, buffer);

        return res.json({
            message: "Profile image uploaded successfully", data: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                phone: req.user.phone,
                image: fileName ? `/images/${fileName}` : null
            }
        });
    } catch (error) {
        console.error("Error uploading profile image:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};










