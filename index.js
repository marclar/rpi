global.log = console.log.bind(console);
require('dotenv').load();

var awsIot = require('aws-iot-device-sdk');
var ctrl = require('./ctrl');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var device = awsIot.device({
    keyPath: process.env.AWS_IOT_PRIVATE_KEY,
    certPath: process.env.AWS_IOT_CLIENT_CERT,
    caPath: process.env.AWS_IOT_CA_CERT,
    clientId: 'rpi1',
    region: 'us-east-1'
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
    .on('connect', function() {
        log('connected...');
        device.subscribe('topic_1');
        //device.publish('topic_2', JSON.stringify({ test_data: 1}));
    });

device
    .on('message', function(topic, payload) {
        try{
            payload = JSON.parse(payload.toString());
            ctrl.handle(payload, function(err, result){
                if(err){
                    console.error('Error from ctrl.handle', err);
                }
                else if(result){
                    console.log('Result from ctrl.handle', result);
                }
            });
        }
        catch(e){
            console.error('Error parsing payload', e);
        }
    });

