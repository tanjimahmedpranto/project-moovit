var Event = require("../models/eventSchema");
const { buildEvent } = require("../../helper/helper");

const EventService = {
  FindAll: (req) => {
    return Event.find();
  },

  Find: (id) => {
    return Event.findOne({ _id: id });
  },

  Create: async (req) => {
    var event = buildEvent(req);
    event.createdBy = "logged in user"; //TODO
    return await event.save();
  },

  Bulk_Create: async (req) => {
    const events = req.body;

    if (!Array.isArray(events)) {
      return res.status(400).send({
        message: "Request body should be an array of events.",
      });
    }

    /** save all events */
    return await Event.insertMany(events);
  },

  Update: async (req) => {
    console.log(req.params.id);
    return await Event.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { // TODO: refactor 
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
          participants: req.body.participants,
          modifiedBy: "logged in user", //logged in user; TODO
        },
      },
      {
        new: true,
      }
    );
  },

  Delete: async (id) => {
    return await Event.findOneAndDelete({ _id: id });
  },

  Bulk_Delete: async () => {
    return await Event.deleteMany();
  },
};

module.exports = EventService;
