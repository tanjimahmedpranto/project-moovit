const Category = require('../models/categorySchema');
const {Status, FAIL, SUCCESS} = require('../../status');

// Update tag.
async function updateCategory(id, newName, modifier){
    try{
        // Attempt to find target and update
        const tagUpdateResult = await Category.findOneAndUpdate(
            {_id: id},
            {$set: {tagName: newName, modifiedBy: modifier},},
            {new: true,}
        );
        if(tagUpdateResult.acknowledged){
            
        }

    } catch(e){
       console.error(e); 
       return(new Status(500, FAIL, e));
    }

    // If no error, return success status.
    return(new Status(200, SUCCESS, "tag edited"));

}

module.exports = {updateCategory};