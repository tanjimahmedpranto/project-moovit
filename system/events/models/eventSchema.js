const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({ 
    eventName: {
        type: String,
        required: true,
        unique:false
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    },
    locationName: {
        type: String
    },
    host: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    }, 
    maxParticipants: {
        type: Number,
        required: true
    },
    enrolledPartipants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    imageURL: {
        type: String,
        required: true
    },
    blurhash: {
        type: String,
        required: false
    }, 
    duration: {
        type: Number,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { 
    timestamps: true,
})
eventSchema.index({ "location.coordinates": "2dsphere" });

// Define method to check if user is the creator
eventSchema.methods.isUserCreator = function(userId) {
    return this.creator.equals(userId);
};

// Define method to check if user is an enrolled participant
eventSchema.methods.isUserParticipant = function(userId) {
    return this.enrolledParticipants.some(participantId => participantId.equals(userId));
};

// Define method to enroll a user in an event
eventSchema.methods.enrollUser = function(userId) {
    // Check if user is already enrolled or is the creator
    if (!this.enrolledParticipants.includes(userId) && !this.creator.equals(userId)) {
        // User is neither enrolled nor the creator, so add the user to enrolledParticipants
        this.enrolledParticipants.push(userId);
        return true; // User successfully enrolled
    }
    return false; // User was not enrolled
};

module.exports = mongoose.model('Create', eventSchema, "events")