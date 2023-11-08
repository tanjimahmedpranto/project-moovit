const createLogic = require('./services/createEvent.js');

function createEvent(username, password){
    return createLogic.createEvent(username, password);
}


module.exports = {
    createEvent
}