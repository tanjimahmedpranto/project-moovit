const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
    },
    locationName: {
      type: String,
    },
    host: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maxParticipants: {
      type: Number,
      required: true,
    },
    enrolledParticipants: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }],
      default: [],
    },
    imageURL: {
      type: String,
      required: false, //fix later
    },
    blurhash: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);
eventSchema.index({ "location.coordinates": "2dsphere" });

// Define method to check if user is the creator
eventSchema.methods.isUserCreator = function (userId) {
  return this.creator.equals(userId);
};

// Define method to check if user is an enrolled participant
eventSchema.methods.isUserParticipant = function (userId) {
  if (!Array.isArray(this.enrolledParticipants)) {
    // If enrolledParticipants is undefined or not an array, return false
    return false;
  }
  return this.enrolledParticipants.some((participantId) =>
    participantId.equals(userId)
  );
};

// Define method to enroll a user in an event
eventSchema.methods.enrollUser = function (userId) {
  // Check if user is already enrolled or is the creator
  if (!this.enrolledParticipants) {
    this.enrolledParticipants = []; // Initialize it as an empty array
  }

  // Convert userId to ObjectId
  const mongoose = require('mongoose');
  const userIdObject = new mongoose.Types.ObjectId(userId);

  // Check if user is already enrolled or is the creator
  if (
    !this.enrolledParticipants.some(id => id.equals(userIdObject)) &&
    !this.creator.equals(userIdObject)
  ) {
    // User is neither enrolled nor the creator, so add the user to enrolledParticipants
    this.enrolledParticipants.push(userIdObject);
    return true; // User successfully enrolled
  }
  return false; // User was not enrolled
}

module.exports = mongoose.model("Create", eventSchema, "events");
