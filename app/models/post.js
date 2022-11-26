/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');
const { mailer } = require('../utils');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Category, User }) {
            // CARDINALIDAD:

            // uno a muchos con las categorias
            Post.belongsTo(Category, {
                as: 'category',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                foreignKey: {
                    name: '',
                },
            });

            // uno a muchos con las usuarios
            Post.belongsTo(User, {
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                foreignKey: {
                    name: 'userId',
                },
            });
        }
    }
    Post.init(
        {
            title: DataTypes.STRING,
            desc: DataTypes.TEXT,
            photo: DataTypes.STRING,
            userId: DataTypes.INTEGER, //FK
            categoryId: DataTypes.INTEGER, //FK
        },
        {
            hooks: {
                afterCreate: async (post, options) => {
                    const user = await sequelize.models.User.findByPk(
                        post.userId
                    );
                    const to = user.email;
                    const subject = 'Post creado exitosamente';
                    const data = `El post ${post.title} fue creado exitosamente`;
                    await mailer.sendMail({ to, subject, data });
                },
            },
            sequelize,
            modelName: 'Post',
            tableName: 'posts',
        }
    );
    return Post;
};
