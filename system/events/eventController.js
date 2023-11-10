const createLogic = require('./services/createEvent.js');
const deleteLogic = require('./services/createEvent.js');
const updateLogic = require('./services/createEvent.js');
const getEventsLogic = require('./services/getEvents.js');
const getSingleLogic = require('./services/getSingleEvent.js');


function getSingleEvent(){
    return 
}

function getEvents(){
    return
}

function createEvent(eventName, description, date, location, locationName, host, creator, maxParticipants, duration){
    return(createLogic.createEvent(eventName, description, date, location, locationName, host, creator, maxParticipants, duration));
}

function deleteEvent(){
    return
}

function updateEvent(){
    return
}


module.exports = {
    getSingleEvent,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}