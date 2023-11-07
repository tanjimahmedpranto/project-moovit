const registerLogic = require('./services/register.js');
const loginLogic = require('./services/login.js');
const userInfoLogic = require('./services/userInfo.js');

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