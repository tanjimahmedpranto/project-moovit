const bcrypt = require('bcrypt');
const Registration = require('./models/loginSchema');
const {SUCCESS, FAIL, USER_EXISTS} = require('./status/statusConstants');
const Status = require('./status/Status');

const USERNAME_MAX_LENGTH = 20;
const USERNAME_MIN_LENGTH = 5;

async function registerUser(username, password){
    
    // Check that username is allowed.
    if(!isAllowedUsername(username)){
        
        return(new Status(400, FAIL, "username not allowed"));
    } 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const existingUser = await Registration.findOne({username: username})
    if(existingUser){
        console.log("User exists");
        return(new Status(400, USER_EXISTS, "user exists"));
    }

    const registration = new Registration({
        username: username.trim(),
        password: hashedPassword
    })

    const registrationRes = await registration.save();
    if (registrationRes) {
        console.log(registrationRes)
    } 
  
    return(new Status(201, SUCCESS, "successfully registered"));
}

function isAllowedUsername(username){
    return(/^[_A-Za-z0-9\.]+$/.test(username) &&
    username.length < USERNAME_MAX_LENGTH &&
    username.length > USERNAME_MIN_LENGTH)
}
module.exports =  {registerUser};