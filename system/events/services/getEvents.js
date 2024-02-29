const Event = require("../models/eventSchema");
const { Status, SUCCESS, FAIL } = require("../../status");
const { UserTypeEnum } = require("../../utilities/enums");
const mongoose = require("mongoose");

// Get events.
async function getEvents() {}

// Get single.
async function getSingleEvent(id) {
  try {
    const event = await Event.findOne({ _id: id });
    // Calculate the number of enrolled participants
    const enrolledParticipantsCount = event.enrolledParticipants.length;

    // Create a new object with the event data and enrolledParticipantsCount
    const eventDataWithCount = {
      ...event.toObject(),
      enrolledParticipantsCount
    };

    return new Status(201, SUCCESS, eventDataWithCount); //quick fix
  } catch (e) {
    console.error(e);
    return new Status(500, SUCCESS, {});
  }
}

// Get random events.
async function getRandomEvents(eventQuantity) {
  // Get the total number of documents in the collection.
  const totalEvents = await Event.countDocuments();
  const sampleSize = Math.min(eventQuantity, totalEvents);
  const randomEvents = await Event.aggregate([
    { $sample: { size: sampleSize } },
  ]);

  // Check if events are found.
  if (randomEvents.length > 0) {
    return new Status(200, SUCCESS, randomEvents);
  } else {
    return new Status(404, FAIL, []);
  }
}

async function getFiltedEvents(filters) {
  // Construct the filter object based on the provided filters
  let filter = {};

  // If eventName is provided, filter by eventName
  if (filters.eventName) {
    filter["eventName"] = { $regex: filters.eventName, $options: "i" }; // Case-insensitive search for eventName
  }

  // If city is provided, filter by city within 50km range
  if (filters.city) {
    const [longitude, latitude] = filters.city.split(",").map(parseFloat);
    filter["location.coordinates"] = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: 50000, // 50km in meters
      },
    };
  }

  if (filters.categories && filters.categories.length > 0) {
    filter["categories"] = {
      $in: filters.categories.map((id) => new mongoose.Types.ObjectId(id)),
    };
  }
  if (filters.tags && filters.tags.length > 0) {
    filter["tags"] = {
      $in: filters.tags.map((id) => new mongoose.Types.ObjectId(id)),
    };
  }
  //If date is provided, filter by date
  if (filters.date) {
    console.log(filters.date)
    filter["date"] = new Date(filters.date);
  }

  //   If fromTime and toTime are provided, filter by time
  if (filters.fromTime && filters.toTime) {
    filter["$expr"] = {
      $and: [
        {
          $gte: [{ $hour: "$date" }, parseInt(filters.fromTime.split(":")[0])],
        },
        { $lte: [{ $hour: "$date" }, parseInt(filters.toTime.split(":")[0])] },
      ],
    };
  }

  // Execute the query using the constructed filter
  const events = await Event.find(filter);

  return new Status(200, SUCCESS, events);
}

// Get user role in the event.
async function getUserRole(eventId, userId) {
  try {
    const event = await Event.findById(eventId); // Use await to get the result

    if (!event) {
      // Event not found
      return new Status(404, 'Error', 'Event not found');
    }

    if (event.isUserCreator(userId)) {
      return new Status(200, 'Success', UserTypeEnum.EventCreator);
    } else if (event.isUserParticipant(userId)) {
      return new Status(200, 'Success', UserTypeEnum.Participant);
    } else {
      return new Status(200, 'Success', UserTypeEnum.Enthusiast);
    }
  } catch (err) {
    // Handle error
    console.error(err);
    return new Status(500, 'Error', err.message);
  }
}

module.exports = {
  getEvents,
  getRandomEvents,
  getFiltedEvents,
  getSingleEvent,
  getUserRole,
};
