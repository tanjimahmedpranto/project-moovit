const Tag = require('../models/tagSchema');
const {Status, SUCCESS, FAIL} = require('../../status');

// Create tag.
async function createTag(tagName, creator){
    const newTag = new Tag({tagName, creator});
    try {
        // Check whether tag already exists.
        const tagExists = await Tag.findOne({tagName})
        if(tagExists){
            return(new Status(400, FAIL, "Tag exists"));
        }

        // Add tag to database.
        const tagCreationResult = await newTag.save();
        
        if (tagCreationResult.acknowledged) {
            console.log(tagCreationResult)
            return(new Status(500, FAIL, "Something happened"));
        } 

    } catch(e){
        console.error(e);
    }

    // If no error, return success status.
    return(new Status(201, SUCCESS, "new tag created"));
}

module.exports = {createTag};

