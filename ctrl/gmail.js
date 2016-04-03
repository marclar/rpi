var email = require('emailjs');

var server = email.server.connect({
    user: process.env.GMAIL_USERNAME,
    password: process.env.GMAIL_PASSWORD,
    host: 'smtp.gmail.com:587',
    ssl: true
});

module.exports = {

    send: function(to, subject, text, cb){

        server.send({
            from: process.env.GMAIL_USERNAME,
            to: to,
            subject: subject,
            text: text
        }, cb);

    }

};