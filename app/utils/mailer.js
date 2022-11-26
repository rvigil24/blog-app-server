const nodemailer = require('nodemailer');
const { mailer } = require('../config/');

const transporter = nodemailer.createTransport(mailer.mailConfig);

const sendMail = async ({ to, subject, data }) => {
    try {
        await transporter.sendMail({
            to,
            from: process.env.SMTP_SENDER_EMAIL,
            subject,
            text: data,
        });
    } catch (ex) {
        console.error(ex);
    }
};

module.exports = {
    sendMail,
};
