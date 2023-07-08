import Jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
    const jwtSecretKey = 't9rXw5bF2mS7zQ8p';
    const token = Jwt.sign({ _id: user._id, name: user.name, email: user.email, phone: user.phone }, jwtSecretKey);
    return token;
};

export const adminToken = (data) => {
    const jwtSecretKey ='t9rXw5bF2mS7zQ8p';
    const token = Jwt.sign({ email: data.email }, jwtSecretKey);
    return token;
};

