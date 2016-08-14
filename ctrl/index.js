'use strict';
var _ = require('lodash');
var Promise = require('bluebird');


module.exports = {

    handle: function(msg){
        return new Promise(function(resolve, reject){

            try{
                if(!msg || !msg.ctrl || !msg.action){
                    console.error('Missing required "msg" parameter with "ctrl" and "action" properties', msg);
                }
                else{
                    var handler = require('./'+msg.ctrl+'.js');
                    if(!handler || (typeof handler[msg.action] !== 'function')){
                        console.error('ctrl "'+msg.ctrl+'" has no "'+msg.action+'" action.');
                    }
                    else{
                        return handler[msg.action](msg.body).then(resolve).catch(reject);
                    }
                }
            }
            catch(e){
                console.error('Error in ctrl.handle', e);
                reject(e);
            }

        });
    }

};

