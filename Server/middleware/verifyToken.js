import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = Jwt.verify(token, 't9rXw5bF2mS7zQ8p');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};