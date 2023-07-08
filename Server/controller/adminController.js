import { adminToken } from "../middleware/auth.js";

let credentials = {
    email: "admin@gmail.com",
    password: "123",
}


export const adminLogin = async (req, res, next) => {

    let adminResult = {
        Status: false,
        message: null,
        token: null,
    };

    try {
        let adminDetails = req.body;
        if (credentials.email === adminDetails.email) {
            if (credentials.password === adminDetails.password) {             
                let admin={
                    email:adminDetails.email,
                    password:adminDetails.password,
                }
                const token = adminToken(admin);
                adminResult.Status = true;
                adminResult.token = token;
                res.json({ adminResult });
            } else {
                adminResult.message = "Your Password not matched";
                res.json({ adminResult });
            }
        } else {
            adminResult.message = "Your email is wrong";
            res.json({ adminResult });
        }


    } catch (error) {
        console.log(error);
    }
}