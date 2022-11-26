const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// storage para almacenar archivos de manera local
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'));
    },
    filename: function (req, file, cb) {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

module.exports = {
    diskStorage,
};
