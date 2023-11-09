var createLogic = require("./services/create");
const {Status, SUCCESS, FAIL, TYPE_EXISTS, TYPE_NOT_EXISTS} = require("../status");

async function create(typeName, creator){
  return await createLogic.createType(typeName, creator);
} 

module.exports = {
  create
}