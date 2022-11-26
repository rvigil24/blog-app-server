const multer = require('multer');
const { storage: multerStorage } = require('../config/');
const { allowedPhotoTypes, diskStorage, s3Storage } = multerStorage;
const isDevEnvironment = process.env.NODE_ENV === 'development';

const fileFilter = (_, file, cb) => {
    const validExtension = allowedPhotoTypes.includes(file.mimetype);
    if (!validExtension) {
        return cb(new Error('Solo se permiten archivos  .png, y .jpeg'), false);
    }

    return cb(null, true);
};
const storage = isDevEnvironment ? diskStorage : s3Storage;
const upload = multer({
    storage,
    fileFilter,
});
const getPhotoUrl = (req, _, next) => {
    req.photoUrl =
        process.env.NODE_ENV === 'development'
            ? req.file?.path
            : req.file?.location;
    next();
};

module.exports = {
    upload,
    getPhotoUrl,
};
