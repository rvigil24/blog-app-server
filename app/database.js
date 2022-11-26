const Sequelize = require('sequelize');
const { database } = require('./config/');

module.exports = (async () => {
    const env = process.env.NODE_ENV;
    const sequelize = new Sequelize(database[env]);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log(error);
    }
})();
