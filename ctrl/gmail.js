var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport([
    'smtps://',
    encodeURIComponent(process.env.GMAIL_USERNAME),
    ':',
    process.env.GMAIL_USERNAME,
    '@smtp.gmail.com'
].join(''));

module.exports = {

    send: function(msg, cb){

        transporter.sendMail({
            from: process.env.GMAIL_USERNAME,
            to: msg.to,
            subject: msg.subject,
            text: msg.text
        }, cb);

    }

};
