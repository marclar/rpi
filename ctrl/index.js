var fs = require('fs');

module.exports = {

    handle: function(msg, cb){
        try{
            if(!msg || !msg.ctrl || !msg.action){
                console.error('Missing required "msg" parameter with "ctrl" and "action" proprties', msg);
            }
            else{
                var handler = require('./'+msg.ctrl+'.js');
                if(!handler || (typeof handler[msg.action] !== 'function')){
                    console.error('ctrl "'+msg.ctrl+'" has no "'+msg.action+'" action.');
                }
                else{
                    handler[msg.action](msg.body, cb);
                }
            }
        }
        catch(e){
            console.error('Error in ctrl.handle', e);
        }
    }

};

