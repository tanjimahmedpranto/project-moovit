const Type = require('../models/typeSchema');
const {Status, SUCCESS, FAIL} = require('../../status');

async function createType(typeName, creator){
    const newType = new Type({typeName, creator});
    try {

        const typeExists = await Type.findOne({typeName})
        if(typeExists){
            return(new Status(400, FAIL, "Type exists"));
        }
        const typeCreationResult = await newType.save();
        
        if (typeCreationResult.acknowledged) {
            console.log(typeCreationResult)
            return(new Status(500, FAIL, "Something happened"));
        } 

    } catch(e){
        console.error(e);
    }


    return(new Status(201, SUCCESS, "new type created"));
}

module.exports = {createType};

