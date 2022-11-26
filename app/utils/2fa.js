const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// generar un codigo base 32 que se agregara posteriormente al google authenticator
const getTwoFactorAuthenticationCode = () => {
    console.log(
        'process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,',
        process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME
    );

    const secretCode = speakeasy.generateSecret({
        name: process.env.MFA_AUTHENTICATION_APP_NAME,
    });
    return {
        otpauthUrl: secretCode.otpauth_url,
        base32: secretCode.base32,
    };
};

// retornar un codigo QR a nuestro cliente
const respondWithQRCode = (data, response) => {
    QRCode.toFileStream(response, data);
};

module.exports = {
    getTwoFactorAuthenticationCode,
    respondWithQRCode,
};
