import jwt from "jsonwebtoken"

//create token
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });
}

//verify token
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

