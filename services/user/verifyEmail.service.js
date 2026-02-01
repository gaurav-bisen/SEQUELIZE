import db from '../../models/index.js'
const { User } = db;
import { verifyEmailToken } from '../../utils/emailToken.util.js';

class verifyEmail {
    async verify(token) {

        const decoded = verifyEmailToken(token);

        if(decoded.purpose !== 'email-verify') { // extra safety check
            throw {
                status: 400,
                message: 'Invalid token'
            };
        }

        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw {
                status: 404,
                message: 'User not found'
              };
        }

        if (user.isVerified) {
            return { alreadyVerified: true }; //sending verified status
        }

        user.isVerified = true;
        await user.save();

        return {
            alreadyVerified: false
        };
    }
}

export default new verifyEmail();