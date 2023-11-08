const Event = require('../events/models/eventSchema'); // Import the Event model

const buildEvent = (req) => {
  const event = new Event({
    eventName: req.body.eventName,
    type: req.body.type,
    eventStartDatetime: req.body.eventStartDatetime,
    eventEndDatetime: req.body.eventEndDatetime,
    duration: req.body.duration,
    organizerName: req.body.organizerName,
    image: req.body.image,
    description: req.body.description,
    prerequisite: req.body.prerequisite,
    equipment: req.body.equipment,
    maxParticipants: req.body.maxParticipants,
    difficulty: req.body.difficulty,
    terms: req.body.terms,
    sponsors: req.body.sponsors,
    locationLatitude: req.body.locationLatitude,
    locationLongitude: req.body.locationLongitude,
    participants: req.body.participants
  });

  return event;
};

module.exports = {
  buildEvent,
};