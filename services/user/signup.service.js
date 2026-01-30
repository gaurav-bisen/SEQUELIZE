import bcrypt from 'bcrypt'
import db from '../../models/index.js'
const { User } = db;

class SignupUser{
    async signup({name, email, status, password, role}){
        const existingUser = await User.findOne({
            where: { email }
        });
        if(existingUser){
            throw {
                status: 409,
                message: 'User already exists'
            };
        }

        const hashPassword = await bcrypt.hash(password, 10);

        return await User.create({
            name,
            email,
            status,
            password: hashPassword,
            role
        });
    }

    async getUserByEmail(email) {
        return await User.findOne({
            where: {email},
            attributes: ['id','name',  'email','status', 'password','role', 'last_login_at']
        });
    }
}

export default new SignupUser();
