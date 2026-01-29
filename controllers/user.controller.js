import db from '../models/index.js'
const { User } = db;

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        return res.status(200).json({
            success: true,
            msg: 'User Created SuccessFully!',
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}