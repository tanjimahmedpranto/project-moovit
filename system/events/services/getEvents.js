const {Status, SUCCESS, FAIL} = require('../../status');
const Event = require('../models/eventSchema');

// Get single.
async function getSingleEvent(id){

    try{
        const event = await Event.findOne({_id: id});
        console.log(event);
        return(new Status(201, SUCCESS, event));
    }catch(e){
        console.error(e)
        return(new Status(500, SUCCESS, {}));
    }
}

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

async function getFiltedEvents(filters){
   // Construct the filter object based on the provided filters
   let filter = {};

   // If city is provided, filter by city
   if (filters.city) {
       filter['location.coordinates'] = {
           $near: {
               $geometry: {
                   type: "Point",
                   coordinates: filters.city.split(',').map(parseFloat)
               }
           }
       };
   }

   // If categories are provided, filter by categories
   if (filters.categories && filters.categories.length > 0) {
       filter['categories'] = { $in: filters.categories };
   }

   // If tags are provided, filter by tags
   if (filters.tags && filters.tags.length > 0) {
       filter['tags'] = { $in: filters.tags };
   }

   // If date is provided, filter by date
   if (filters.date) {
       filter['date'] = new Date(filters.date);
   }

   // If fromTime and toTime are provided, filter by time
   if (filters.fromTime && filters.toTime) {
       filter['$expr'] = {
           $and: [
               { $gte: [{ $hour: '$date' }, parseInt(filters.fromTime.split(':')[0])] },
               { $lte: [{ $hour: '$date' }, parseInt(filters.toTime.split(':')[0])] }
           ]
       };
   }

   // Execute the query using the constructed filter
   const events = await Event.find(filter);

   //return events;
    
    // Check if events are found.
    if(events.length > 0) {
        return(new Status(200, SUCCESS, events));
    } else {
        return(new Status(404, FAIL, []));
    }
}

module.exports = {getEvents, getRandomEvents, getFiltedEvents, getSingleEvent};
