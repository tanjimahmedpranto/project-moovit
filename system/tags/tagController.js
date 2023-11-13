var createLogic = require("./services/createTag");
var updateLogic = require("./services/updateTag");
var getAllLogic = require("./services/getTags");
var getLogic = require("./services/getTag");
const {Status, SUCCESS, FAIL, TYPE_EXISTS, TYPE_NOT_EXISTS} = require("../status");

async function getTags(){
  return await getAllLogic.getTags();
} 

async function getTagById(){
  return await getLogic.getTagById();
} 

async function create(typeName, creator){
  return await createLogic.createType(typeName, creator);
} 

async function update(id, newName, modifier){
  return await updateLogic.updateType(id, newName, modifier);
} 

module.exports = {
  getTags,
  getTagById,
  create,
  update
}