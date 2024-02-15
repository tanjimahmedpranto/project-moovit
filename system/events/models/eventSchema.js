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
    enrolledPartipants: {
        type: Number,
        default: 0
    },
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

module.exports = mongoose.model('Create', eventSchema, "events")