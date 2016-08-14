'use strict';
require('dotenv').load({silent: true});

const _ = require('lodash');
const awsIot = require('aws-iot-device-sdk');
const ctrl = require('./ctrl');
const log = console.log;

var clientId = 'rpi1';

var thingShadow = awsIot.thingShadow({
    keyPath: process.env.AWS_IOT_PRIVATE_KEY,
    certPath: process.env.AWS_IOT_CLIENT_CERT,
    caPath: process.env.AWS_IOT_CA_CERT,
    clientId: clientId,
    thingName: clientId,
    region: 'us-east-1'
});

thingShadow.on('connect', function() {
    log('shadow connected...');
    thingShadow.register( clientId );

    // // An update right away causes a timeout error, so we wait about 2 seconds
    // setInterval( function() {
    //     thingState.state.reported.timestamp = (new Date()).getTime();
    //     thingShadow.update(clientId, thingState);
    // }, 5000);

});

/**
 * Handle incoming messages
 */
thingShadow.on('delta', function(thingName, delta) {
    log('\n\nreceived delta '+' on '+thingName+': ', JSON.stringify(delta, 0, 2));
    ctrl.handle(delta.state)
        .then(function(result){
            log('ctrl handled delta, result: ', result);
        });
});


// // Code below just logs messages for info/debugging
// thingShadow.on('status', function(thingName, stat, clientToken, stateObject) {
//     log('\n\nreceived status "'+stat+'" on '+thingName+': ', JSON.stringify(stateObject, 0, 2));
// });
//
// thingShadow.on('update', function(thingName, stateObject) {
//     log('\n\nreceived update '+' on '+thingName+': ', JSON.stringify(stateObject, 0, 2));
// });
//
//
// thingShadow.on('timeout', function(thingName, clientToken) {
//     log('\n\nreceived timeout for '+ clientToken)
// });
//
// thingShadow.on('close', function() {
//     log('\n\nclose');
// });
//
// thingShadow.on('reconnect', function() {
//     log('\n\nreconnect');
// });
//
// thingShadow.on('offline', function() {
//     log('\n\noffline');
// });
//
// thingShadow.on('error', function(error) {
//     log('\n\nerror', error);
// });
