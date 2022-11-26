require('dotenv').config();
const path = require('path');

module.exports = {
    development: {
        // storage: `${path.resolve(process.cwd(), 'database.sqlite')}`,
        // logging: console.log,
        // dialect: 'sqlite',
        // seederStorage: 'sequelize',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
};
