const authGoogle = require('./authGoogle.middleware');
const authenticateToken = require('./authenticateToken.middleware');
const uploadFile = require('./uploadFile.middleware')
const authEmail = require('./authEmail.middleware')

module.exports = {
    authGoogle,
    authenticateToken,
    uploadFile,
    authEmail
};
