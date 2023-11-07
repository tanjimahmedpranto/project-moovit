const registerLogic = require('./register.js');
const loginLogic = require('./login.js');
const userInfoLogic = require('./userInfo.js');

function registerUser(username, password){
    return registerLogic.registerUser(username, password);
}

async function login(username, password){
    return await loginLogic.loginUser(username, password);
 
}

function getUserInfo(username, password){

}

module.exports = {
    registerUser,
    login,
    getUserInfo,
}