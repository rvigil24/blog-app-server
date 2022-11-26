const { check, validationResult } = require('express-validator');

const createPost = [
    // campos a validar
    check('title', 'El titulo es requerido').isLength({ min: 3 }).trim(),
    check('desc', 'La descripcion es requerida').isLength({ min: 3 }),
    check('categoryId', 'El id de la categoria es requerido').isNumeric(),

    // validamos si los campos son validos
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const updatePost = [
    // campos a validar
    check('title', 'El titulo debe tener minimo 3 caracteres')
        .optional()
        .isLength({ min: 3 })
        .trim(),
    check('desc', 'La descripcion debe tener minimo 3 caracteres')
        .optional()
        .isLength({ min: 3 }),
    check('categoryId', 'El id de la categoria debe ser valido')
        .optional()
        .isNumeric(),

    // validamos si los campos son validos
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    createPost,
    updatePost,
};
