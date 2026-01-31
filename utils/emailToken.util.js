import { generateToken, verifyToken } from './jwt.util.js'

export const generateEmailToken = (user) => {
    return generateToken({
        id: user.id,
        email: user.email,
        purpose: 'email-verify'
    })
}

export const verifyEmailToken = (token) => {
    return verifyToken(token);
}