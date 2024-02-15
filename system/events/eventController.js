const createLogic = require('./services/createEvent.js');
const deleteLogic = require('./services/createEvent.js');
const updateLogic = require('./services/createEvent.js');
const getEventsLogic = require('./services/getEvents.js');

function getSingleEvent(id){
    return(getEventsLogic.getSingleEvent(id));

}

function getEvents() {
  return;
}

function getRandomEvents(eventQuantity) {
  return getEventsLogic.getRandomEvents(eventQuantity);
}

function getFiltedEvents(filters) {
  return getEventsLogic.getFiltedEvents(filters);
}

function createEvent(eventData) {
  return createLogic.createEvent(eventData);
}

function deleteEvent() {
  return;
}

function updateEvent() {
  return;
}

module.exports = {
  getSingleEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getRandomEvents,
  getFiltedEvents
};
