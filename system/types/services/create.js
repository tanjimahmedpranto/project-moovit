const Type = require('../models/typeSchema');
const {Status, SUCCESS, FAIL} = require('../../status');

// Create type.
async function createType(typeName, creator){
    const newType = new Type({typeName, creator});
    try {
        // Check whether type already exists.
        const typeExists = await Type.findOne({typeName})
        if(typeExists){
            return(new Status(400, FAIL, "Type exists"));
        }

        // Add type to database.
        const typeCreationResult = await newType.save();
        
        if (typeCreationResult.acknowledged) {
            console.log(typeCreationResult)
            return(new Status(500, FAIL, "Something happened"));
        } 

    } catch(e){
        console.error(e);
    }

    // If no error, return success status.
    return(new Status(201, SUCCESS, "new type created"));
}

module.exports = {createType};

