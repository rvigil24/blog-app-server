const userService = require('./user.service');

const registerWithPass = async ({ email, username, password }) => {
    try {
        const user = await userService.getByEmail(email);
        if (user) {
            throw new Error('User already exists');
        }
        const createdUser = userService.create({ email, username, password });
        return userService.toAuthJson(createdUser);
    } catch (ex) {
        throw ex;
    }
};

module.exports = {
    registerWithPass,
};
