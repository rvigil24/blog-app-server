const path = require('path');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { S3Client } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');

AWS.config.region = process.env.AWS_S3_REGION;

// extensiones de archivos permitidos
const allowedPhotoTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const s3 = new S3Client({
    region: AWS.config.region,
});

// storage para almacenar archivos en bucket S3
const s3Storage = multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, { fieldName: fileName });
    },
    key: function (req, file, cb) {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

module.exports = {
    s3Storage,
    allowedPhotoTypes,
};
