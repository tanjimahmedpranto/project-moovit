
const Create = require('../models/createEventSchema');
const {Status, SUCCESS, FAIL} = require('../../status');
const blurhash = require('blurhash');
const Event = require('../models/createEventSchema');

async function createEvent(eventData){
    console.log("location:", eventData.location)
    try{
        // Create blurhash of image.
        
        
        // Create event object
        const newEvent = new Event({
            eventName: escapeHtml(eventData.eventName.trim()),
            description: escapeHtml(eventData.description.trim()),
            date: eventData.date, 
            location: eventData.location,
            locationName: escapeHtml(eventData.locationName),
            host: escapeHtml(eventData.host.trim()),
            creator: eventData.creator,
            maxParticipants: eventData.maxParticipants,
            duration: eventData.duration
        });

        // Add type to database.
        const eventCreationResult = await newEvent.save();
        
        if (eventCreationResult.acknowledged) {
            console.log(eventCreationResult)
            return(new Status(500, FAIL, "Something happened"));
        } 

        // Upload image to image host
        /* TODO */
        
    }catch(e){
        console.error(e);
        return(new Status(400, FAIL, "not ok"));
    }

    return(new Status(201, SUCCESS, "succesfully added"));
}

// Escape sensitive characters using RegEx.
const escapeHtml = input => input.replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');

module.exports = {createEvent}