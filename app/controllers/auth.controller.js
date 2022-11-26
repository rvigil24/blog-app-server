const { auth: authService } = require('../services');

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await authService.registerWithPass({
            username,
            email,
            password,
        });
        return res.status(201).json({
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

// aqui crearemos login con email y password
const login = async (req, res) => {
    const { user } = req;
    return res.status(201).json({
        data: user,
    });
};

// aqui colocaremos nuestra creacion del mfa
const createMfa = async (req, res) => {
    // retornar el QR Code generado por HTML para el cliente
};

module.exports = {
    register,
    login,
};
