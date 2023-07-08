
import bcrypt from 'bcrypt'
import User from '../models/userSchema.js'
import { generateAuthToken } from '../middleware/auth.js';

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
        // Fetch user details from MongoDB
        const user = await req.user;

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // User details found, send the response
        res.json(user); // Sending the user details as a JSON response

    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}


