const { post: postService } = require('../services');

// para obtener lista de posts
const getPostsList = async (req, res, next) => {
    const categorySlug = req.query.category;
    try {
        const posts = await postService.list(categorySlug);
        return res.json({
            data: posts,
        });
    } catch (ex) {
        next(ex);
    }
};

// para obtener posts por id
const getPostById = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await postService.get(postId);
        if (!post) {
            return res.status(404).json({
                data: null,
                message: 'Post not found',
            });
        }
        return res.status(200).json({
            data: post,
        });
    } catch (ex) {
        next(ex);
    }
};

// para crear un nuevo post
const createPost = async (req, res, next) => {
    const { body, user } = req;
    const photo = req.photoUrl;
    try {
        const savePost = await postService.create({ ...body, photo }, user.id);
        return res.status(201).json({
            data: savePost,
            message: 'post created succesfully',
        });
    } catch (ex) {
        next(ex);
    }
};

// para actualizar un post
const updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { body } = req;
    const photo = req.photoUrl;
    try {
        const post = await postService.get(postId);

        // si el post no pertenece al usuario
        if (post.username !== body.username) {
            return res.status(401).json({
                data: null,
                message: 'not authorized',
            });
        }
        if (photo) body.photo = photo;
        const updatePost = await postService.update(postId, body);
        return res.status(200).json({
            data: updatePost,
            message: 'post updated succefully',
        });
    } catch (ex) {
        next(ex);
    }
};

// para eliminar post
const deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { username } = req.body;
    try {
        const post = await postService.get(postId);
        // si el post no existe
        if (!post) {
            return res.status(404).json({
                data: null,
                message: 'Post not found',
            });
        }
        // si el post no pertenece al usuario
        if (post.username !== username) {
            return res.status(401).json({
                data: null,
                message: 'not authorized',
            });
        }
        await postService.remove(post.id);
        return res.status(204).end();
    } catch (ex) {
        next(ex);
    }
};

module.exports = {
    getPostsList,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
