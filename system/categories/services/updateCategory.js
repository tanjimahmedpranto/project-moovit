const Category = require('../models/categorySchema');
const {Status, FAIL, SUCCESS} = require('../../status');

// Update tag.
async function updateCategory(id, newName, modifier){
        // Attempt to find target and update
        const tagUpdateResult = await Category.findOneAndUpdate(
            {_id: id},
            {$set: {tagName: newName, modifiedBy: modifier},},
            {new: true,}
        );
    // If no error, return success status.
    return(new Status(200, SUCCESS, "tag edited"));

}

module.exports = {updateCategory};