import bcrypt from 'bcrypt'
import db from '../../models/index.js'
import mail from '../nodemailer/email.service.js'
const { User } = db;
import { generateResetToken, verifyResetToken } from '../../utils/resetPass.util.js'
import signupUser from './signup.service.js'

class ForgetPasswordService{

    async forgetPassword(email){
        const user = await signupUser.getUserByEmail(email);

        if(!user){
            throw { 
                status: 404, 
                message: 'User not found' 
            };
        }
        if (!user.isVerified) {
            throw {
                status: 403,
                message: "Please verify your email before resetting password."
            }
        }

        const resetToken = generateResetToken({
            id: user.id,
            email: user.email
        })

        return await mail.sendResetPasswordEmail(resetToken, user.email);

        // return { 
        //     message: 'Reset password link sent to email' 
        // };
    }

    async resetPassword(token, newPassword){
        const decoded = verifyResetToken(token);

        if(!decoded) { 
            throw {
                status: 400,
                message: 'Invalid token'
            };
        }

        const user = await signupUser.getUserByEmail(decoded.email);

        if (!user) {
            throw { status: 404, message: 'User not found' };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        return await user.update({ password: hashedPassword });

        // return {
        //     message: 'Password Reset Successfully!!'
        // }
    }
}

export default new ForgetPasswordService();