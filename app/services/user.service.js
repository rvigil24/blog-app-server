const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { handleHash } = require('../utils');

const list = async () => {
    try {
        return await User.findAll();
    } catch (ex) {
        throw ex;
    }
};

const getById = async (id) => {
    try {
        return await User.findOne({ id });
    } catch (ex) {
        throw ex;
    }
};

const getByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } });
    } catch (ex) {
        throw ex;
    }
};

const create = async (data) => {
    try {
        const user = await User.create({ ...data });
        return user;
    } catch (ex) {
        throw ex;
    }
};

const toAuthJson = (user) => {
    const token = jwt.sign(
        {
            ...user,
        },
        process.env.JWT_SECRET
    );
    return {
        ...user,
        token,
    };
};

const comparePassword = async (user, value) => {
    try {
        return await handleHash.compare(value, user.password);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    list,
    create,
    getByEmail,
    getById,
    toAuthJson,
    comparePassword,
};
