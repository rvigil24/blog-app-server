/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');
const slugify = require('slugify');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            // muchos a uno posts
            Category.hasMany(Post, {
                as: 'posts',
                foreignKey: 'categoryId',
            });
        }
    }
    Category.init(
        {
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
        },
        {
            hooks: {
                beforeCreate: (category) => {
                    category.slug = slugify(category.name, {
                        lower: true,
                        trim: true,
                    });
                },
            },
            sequelize,
            modelName: 'Category',
            tableName: 'categories',
        }
    );
    return Category;
};
