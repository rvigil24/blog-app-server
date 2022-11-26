const { diskStorage } = require('./disk.storage');
const { s3Storage, allowedPhotoTypes } = require('./s3.storage');

module.exports = {
    diskStorage,
    s3Storage,
    allowedPhotoTypes,
};
