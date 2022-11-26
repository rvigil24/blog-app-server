const { Post } = require('../models');

const list = async (categorySlug) => {
    try {
        let posts;
        if (categorySlug) {
            posts = await Post.findAll({
                include: { all: true },
                order: [['createdAt', 'DESC']],
                where: { '$category.slug$': categorySlug },
            });
        } else {
            posts = await Post.findAll({
                include: { all: true },
                order: [['createdAt', 'DESC']],
            });
        }
        return posts;
    } catch (ex) {
        throw ex;
    }
};

const get = async (postId) => {
    try {
        return await Post.findByPk(postId, { include: { all: true } });
    } catch (ex) {
        throw ex;
    }
};

const create = async (data, userId) => {
    try {
        return await Post.create({ ...data, userId });
    } catch (ex) {
        throw ex;
    }
};

const update = async (postId, data) => {
    try {
        await Post.update(
            { ...data },
            {
                where: {
                    id: postId,
                },
            }
        );
        return await Post.findByPk(postId);
    } catch (ex) {
        throw ex;
    }
};

const remove = async (postId) => {
    try {
        await Post.destroy({
            where: {
                id: postId,
            },
        });
    } catch (ex) {
        throw ex;
    }
};

module.exports = {
    create,
    list,
    get,
    update,
    remove,
};
