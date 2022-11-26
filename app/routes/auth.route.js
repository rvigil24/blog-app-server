const express = require('express');
const { authController } = require('../controllers');
const { authEmail } = require('../middlewares');

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', [authEmail, authController.login]);

// aqui agregaremos el mfa cuando el cliente este completado
// authRouter.post("/mfa", [])

module.exports = { authRouter };
