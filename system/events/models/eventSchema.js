const mongoose = require("mongoose");
const baseSchema = require("../../base_schema/baseSchema");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type", // Reference to the Type model
    require: true,
  },
  eventStartDatetime: {
    type: Date,
    required: true, // Make startDatetime required
  },
  eventEndDatetime: {
    type: Date,
  },
  duration: {
    type: Number,
    required: true,
  },
  organizerName: {
    type: String,
    required: true,
  },
  image: {
    type: String, // You can use String to store the path or URL of the image
  },
  description: {
    type: String,
  },
  prerequisite: {
    type: String,
  },
  equipment: {
    type: String,
  },
  maxParticipants: {
    type: Number,
  },
  difficulty: {
    type: Number,
    enum: [1, 2, 3], // Enum: Easy: 1, Medium: 2, Hard: 3
  },
  terms: {
    type: String,
  },
  sponsors: {
    type: [String], // You can store sponsors as an array of strings
  },
  locationLatitude: {
    type: Number,
  },
  locationLongitude: {
    type: Number,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login", // Reference the User model
    },
  ],
  ...baseSchema,
});
eventSchema.set("timestamps", true);

module.exports = mongoose.model("Event", eventSchema, "events");
