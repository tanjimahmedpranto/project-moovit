
const Create = require('../models/createEventSchema');
const {Status, SUCCESS} = require('../../status');
const blurhash = require('blurhash');
const Event = require('../models/createEventSchema');

async function createEvent(eventName, description, date, location, locationName, host, creator, maxParticipants, duration){
    try{
        // Create blurhash of image.
        
        
        // Create event object
        const newEvent = new Event({
            eventName: escapeHtml(eventName.trim()),
            description: escapeHtml(description.trim()),
            date: date, 
            location: location,
            locationName: escapeHtml(locationName),
            host: escapeHtml(host.trim()),
            creator: creator,
            maxParticipants: maxParticipants,
            duration: duration
        });

        // Upload image to image host
        
    }catch(e){
        console.error(e);
        return(new Status(400, FAIL, "not ok"));
    }
    



    return(new Status(200, SUCCESS, "ok"));
}

const escapeHtml = input => input.replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');

module.exports = {createEvent}