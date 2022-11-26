const express = require('express');
const { postController } = require('../controllers');
const { authenticateToken, uploadFile } = require('../middlewares');
const { postValidator } = require('../validators');
const postRouter = express.Router();

// leer posts
postRouter.get('/', postController.getPostsList);

// leer posts por id
postRouter.get('/:postId', postController.getPostById);

// crear post
postRouter.post(
    '/',
    authenticateToken,
    uploadFile.upload.single('photo'),
    uploadFile.getPhotoUrl,
    postValidator.createPost,
    postController.createPost
);

// actualizar post
postRouter.put(
    '/:postId',
    authenticateToken,
    uploadFile.upload.single('photo'),
    postValidator.updatePost,
    postController.updatePost
);

// eliminar post
postRouter.delete('/:postId', authenticateToken, postController.deletePost);

module.exports = { postRouter };
