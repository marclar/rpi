var email = require('emailjs');

var server = email.server.connect({
    user: process.env.GMAIL_USERNAME,
    password: process.env.GMAIL_PASSWORD,
    host: 'smtp.gmail.com',
    port: 587,
    ssl: true
});

module.exports = {

    send: function(msg, cb){

        server.send({
            from: process.env.GMAIL_USERNAME,
            to: msg.to,
            subject: msg.subject,
            text: msg.text
        }, cb);

    }

};