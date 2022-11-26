'use strict';
const { Model } = require('sequelize');
const { mailer, handleHash } = require('../utils');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            User.hasMany(Post, {
                foreignKey: 'userId',
            });
        }
    }
    User.init(
        {
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
            mfa: DataTypes.BOOLEAN,
        },
        {
            hooks: {
                beforeCreate: async (user) => {
                    const plainPassword = user.password;
                    user.password = await handleHash.hash(plainPassword);
                },
                afterCreate: async (user) => {
                    const to = user.email;
                    const subject = 'Cuenta creada';
                    const data = `Hola ${user.username}, tu cuenta ha sido creada exitosamente`;
                    await mailer.sendMail({ to, subject, data });
                },
            },
            sequelize,
            modelName: 'User',
            tableName: 'users',
        }
    );
    return User;
};
