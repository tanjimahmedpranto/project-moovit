var createLogic = require("./services/create");
var updateLogic = require("./services/update");
const {Status, SUCCESS, FAIL, TYPE_EXISTS, TYPE_NOT_EXISTS} = require("../status");

async function create(typeName, creator){
  return await createLogic.createType(typeName, creator);
} 

async function update(id, newName, modifier){
  return await updateLogic.updateType(id, newName, modifier);
} 

module.exports = {
  create,
  update
}