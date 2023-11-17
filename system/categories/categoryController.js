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

async function create(categoryName, creator){
  return await createLogic.createCategory(categoryName, creator);
} 

async function update(id, newName, modifier){
  return await updateLogic.updateCategory(id, newName, modifier);
} 

module.exports = {
  getCategories,
  getCategoryById,
  create,
  update
}