const {Status, SUCCESS} = require('../../status/')

async function logoutUser(res){
  // Set the token to an expired date
  const expiredDate = new Date(0);

  // Assuming the token is stored in a cookie named 'accessToken'
  res.cookie('accessToken', '', { expires: expiredDate, httpOnly: true });

  // If using local storage, you may want to clear the token
  // localStorage.removeItem('accessToken');

  // Return a success status
  return new Status(200, SUCCESS, 'User successfully logged out');
}

module.exports =  {logoutUser};