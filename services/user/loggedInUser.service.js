import db from '../../models/index.js'
const { User } = db;

class LoggedInUser{
    async loggedUser(req, res, next){
        //get token from body
        const token = req.body.token;
        const loginUser = req.user.id;

        if(!token || !loginUser){
            return res.status(401).json({
                message: "Authentication data missing"
            });
        }

        const user = User.findOne({
            where: {id}
        })

        if (!user) {
            throw {
                status: 400,
                message: 'User Not exists'
            };
        }
    
        return user;
    }
}

export default new LoggedInUser();