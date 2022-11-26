const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = async (value) => {
    try {
        return await bcrypt.hash(value, saltRounds);
    } catch (err) {
        throw err;
    }
};

const compare = async (value, hash) => {
    try {
        const result = await bcrypt.compare(value, hash);
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    hash,
    compare,
};
