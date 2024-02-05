const {Status, SUCCESS, FAIL} = require('../../status');

async function getSingleEvent(id){
    const data = {"msg":"Hello World"};
    return(new Status(201, SUCCESS, data));
}

module.exports = {getSingleEvent}