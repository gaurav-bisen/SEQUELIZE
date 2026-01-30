import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import signupService from './signup.service.js'

class AuthService {
    async login({ email, password }) {
        //find user
        const user = await signupService.getUserByEmail(email);
        if (!user) {
            throw {
                status: 400,
                message: 'invalid credentials'
            };
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw {
                status: 401,
                message: 'invalid password!'
            }
        }

        //update last login
        await user.update({ last_login_at: new Date() });

        // Generate JWT
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return { token, user }
    }
}

export default new AuthService();