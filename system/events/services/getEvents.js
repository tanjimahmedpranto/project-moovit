const Event = require('../models/eventSchema');
const {Status, SUCCESS, FAIL} = require('../../status');

// Get events.
async function getEvents(){
    
}

// Get random events.
async function getRandomEvents(eventQuantity){
    // Get the total number of documents in the collection.
    const totalEvents = await Event.countDocuments();
    const sampleSize = Math.min(eventQuantity, totalEvents);
    const randomEvents = await Event.aggregate([
        { $sample: { size: sampleSize } }
    ]);
    
    // Check if events are found.
    if(randomEvents.length > 0) {
        return(new Status(200, SUCCESS, randomEvents));
    } else {
        return(new Status(404, FAIL, []));
    }
}

module.exports = {getEvents, getRandomEvents};