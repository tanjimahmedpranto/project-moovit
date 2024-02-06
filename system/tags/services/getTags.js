const Tag = require('../models/tagSchema');
const {Status, SUCCESS, FAIL} = require('../../status');

// Get tags.
// Get categories.
async function getTags(){
    // Get the total number of documents in the collection.
    const tags = await Tag.find({}).select('tagName _id');
    
    if(tags.length > 0) {
        return(new Status(200, SUCCESS, tags));
    } else {
        return(new Status(404, FAIL, []));
    }
}

module.exports = {getTags};

