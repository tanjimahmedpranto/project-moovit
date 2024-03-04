const { Status, SUCCESS, FAIL } = require("../../status");
const Event = require("../models/eventSchema");

// Define a function to disjoin (leave) an event
async function disjoinEvent(data) {
  // Find event by ID
  const event = await Event.findById(data.eventId);
  if (!event) {
    // Event not found
    return new Status(500, FAIL, "Event not found!!");
  }

  // Check if the user is enrolled in the event
  const mongoose = require('mongoose');
  const userId = new mongoose.Types.ObjectId(data.userId);
  const enrolledIndex = event.enrolledParticipants.indexOf(userId);
  if (enrolledIndex === -1) {
    // User is not enrolled in the event
    return new Status(500, FAIL, "User is not enrolled in the event");
  }

  // Remove the user from the enrolled participants array
  event.enrolledParticipants.splice(enrolledIndex, 1);

  // Save the updated event
  await event.save();
  
  return new Status(200, SUCCESS, "Left the event successfully!!");
}

module.exports = { disjoinEvent };
