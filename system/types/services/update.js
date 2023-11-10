const Type = require('../models/typeSchema');
const {Status, FAIL, SUCCESS} = require('../../status');

// Update type.
async function updateType(id, newName, modifier){
    try{
        // Attempt to find target and update
        const typeUpdateResult = await Type.findOneAndUpdate(
            {_id: id},
            {$set: {typeName: newName, modifiedBy: modifier},},
            {new: true,}
        );
        if(typeUpdateResult.acknowledged){
            
        }

    } catch(e){
       console.error(e); 
       return(new Status(500, FAIL, e));
    }

    // If no error, return success status.
    return(new Status(200, SUCCESS, "type edited"));

}

module.exports = {updateType};