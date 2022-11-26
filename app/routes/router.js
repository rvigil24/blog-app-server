const express = require('express');
const { authRouter, userRouter, categoryRouter, postRouter } = require('./');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);

module.exports = { router };
