'use strict';
require('dotenv').load({silent: true});

var _ = require('lodash');
var nodemailer = require('nodemailer');
var Promise = require('bluebird');

var transporter = Promise.promisifyAll(nodemailer.createTransport([
    'smtps://',
    encodeURIComponent(process.env.GMAIL_USERNAME),
    ':',
    process.env.GMAIL_PASSWORD,
    '@smtp.gmail.com'
].join('')));

module.exports = {

    send: function(msg){
        return transporter.sendMailAsync({
            from: process.env.GMAIL_USERNAME,
            to: msg.to,
            subject: msg.subject,
            text: msg.text
        });
    }

};
