const Type = require('../models/typeSchema');
const {Status, FAIL, SUCCESS} = require('../../status');

async function updateType(id, newName, modifier){
    try{
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
    return(new Status(200, SUCCESS, "type edited"));

}

module.exports = {updateType};