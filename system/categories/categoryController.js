var createLogic = require("./services/createCategory");
var updateLogic = require("./services/updateCategory");
var getAllLogic = require("./services/getCategories");
var getLogic = require("./services/getCategory");
const {Status, SUCCESS, FAIL, TYPE_EXISTS, TYPE_NOT_EXISTS} = require("../status");

async function getCategories(){
  return await getAllLogic.getCategories();
} 

async function getCategoryById(){
  return await getLogic.getCategoryById();
} 

async function create(typeName, creator){
  return await createLogic.createType(typeName, creator);
} 

async function update(id, newName, modifier){
  return await updateLogic.updateType(id, newName, modifier);
} 

module.exports = {
  getCategories,
  getCategoryById,
  create,
  update
}