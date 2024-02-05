const {Status, SUCCESS, FAIL} = require('../../status');
const Event = require('../models/createEventSchema');

async function getSingleEvent(id){

    try{
        const event = await Event.findOne({_id: "657a2060fd50b3ff90c46115"});
        console.log(event);
        return(new Status(201, SUCCESS, event));
    }catch(e){
        console.error(e)
        return(new Status(500, SUCCESS, {}));
    }
}

module.exports = {getSingleEvent}