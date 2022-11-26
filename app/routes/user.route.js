const express = require('express');
const { userController } = require('../controllers');
const { authenticateToken } = require('../middlewares');

const userRouter = express.Router();

userRouter.get('/me', [authenticateToken, userController.getUserMe]);

module.exports = { userRouter };
