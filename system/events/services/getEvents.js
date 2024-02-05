const Event = require('../models/createEventSchema');
const {Status, SUCCESS, FAIL} = require('../../status');

// Get events.
async function getEvents(){
    
}

// Get tags.
async function getRandomEvents(eventQuantity){
    // Get the total number of documents in the collection.
    const totalEvents = await Event.countDocuments();
    const sampleSize = Math.min(eventQuantity, totalEvents);
    const randomEvents = await Event.aggregate([
        { $sample: { size: sampleSize } }
    ]);
    
    // Check if events are found.
    if(randomEvents.length > 0) {
        return(new Status(201, SUCCESS, randomEvents));
    } else {
        return(new Status(404, FAIL, []));
    }
}

module.exports = {getEvents, getRandomEvents};