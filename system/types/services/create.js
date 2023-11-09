const TypeCreation = require('../models/typeCreateSchema');
const {Status, SUCCESS, FAIL} = require('../../status');

async function createType(typeName, creator){
    const newType = new TypeCreation({typeName, creator});
    try {

        const typeExists = await TypeCreation.findOne({typeName})
        if(typeExists){
            return(new Status(400, FAIL, "Type exists"));
        }
        const typeCreationResult = await newType.save();
        
        if (typeCreationResult.acknowledged) {
            console.log(typeCreationResult)
        } 
    } catch(e){
        console.error(e);
    }


    return(new Status(201, SUCCESS, "new type created"));
}

module.exports = {createType};

