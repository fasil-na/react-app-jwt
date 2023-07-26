import { adminToken } from "../middleware/auth.js";
import User from "../models/userSchema.js";

// let credentials = {
//     email: "admin@gmail.com",
//     password: "123",
// }


// export const adminLogin = async (req, res, next) => {

//     let adminResult = {
//         Status: false,
//         message: null,
//         token: null,
//     };

//     try {
//         let adminDetails = req.body;
//         if (credentials.email === adminDetails.email) {
//             if (credentials.password === adminDetails.password) {             
//                 let admin={
//                     email:adminDetails.email,
//                     password:adminDetails.password,
//                 }
//                 const token = adminToken(admin);
//                 adminResult.Status = true;
//                 adminResult.token = token;
//                 res.json({ adminResult });
//             } else {
//                 adminResult.message = "Your Password not matched";
//                 res.json({ adminResult });
//             }
//         } else {
//             adminResult.message = "Your email is wrong";
//             res.json({ adminResult });
//         }


//     } catch (error) {
//         console.log(error);
//     }
// }




export const clientListGet = async (req, res, next) => {
    try {
        const clientData = await User.find({ isAdmin: false })

        res.json(clientData);
    } catch (error) {
        console.log(error);
    }
}

export const clientDelete = async (req, res, next) => {
    let userId = req.params.id
    try {
        await User.deleteOne({ _id: userId })

        return res.json('Client deleted successfully');
    } catch (error) {
        console.log(error);
    }
}







export const clientUpdate = async (req, res, next) => {
    let userId = req.params.id;
    const newValues = req.body;
    try {
        await User.updateOne({ _id: userId }, newValues)

        return res.json({ message: 'Client updated successfully', status: true });
    } catch (error) {
        console.log(error);
    }
}