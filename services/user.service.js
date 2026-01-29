import db from '../models/index.js'
const { User } = db;

export const createUser = async (userData) => {
    const existingUser = await User.findOne({
        where: { email: userData.email }
    });

    if (existingUser) {
        throw {
            status: 409,
            message: 'User already exists'
        };
    }
    return await User.create(userData);
}

export const getAllUsers = async () => {
    const users = await User.findAll({});

    if (!users) {
        throw {
            status: 400,
            message: '0 users exists'
        };
    }

    return users;
}

export const getUserById = async (id) => {
    const user = await User.findOne({
        where: { id },
        //to get specific field from db (dont use this if want all columns from db)
        attributes: ['id', 'name', 'email']
    });

    if (!user) {
        throw {
            status: 400,
            message: 'User Not exists'
        };
    }

    return user;
}

export const deleteUser = async (id) => {
    const user = await User.destroy({
        where: { id },

        //force: true //to hard delete
    });

    if (!user) {
        throw {
            status: 400,
            message: 'User Not exists'
        };
    }

    return deleteUser;
}

export const updateUser = async (id, updateUser) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw {
            status: 404,
            message: 'User Not Found'
        };
    }

    await user.update(updateUser) //user update which is find by pk

    return user;
}