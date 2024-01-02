const bcrypt = require("bcrypt");
const User = require("../models/loginSchema");
const { SUCCESS, FAIL, USER_EXISTS } = require("../../status");
const { Status } = require("../../status");
const { isNullOrUndefined } = require("../../utilities/validationUtils");

const USERNAME_MAX_LENGTH = 20;
const USERNAME_MIN_LENGTH = 5;

// Register user.
async function editUser(userData) {
  const userId = userData._id.$oid;
  // Check if both username and password value is given
  if (isNullOrUndefined(userData.username, userData.password)) {
    return new Status(400, FAIL, "username or password can not be null");
  }

  // Check that username is allowed.
  if (!isAllowedUsername(userData.username)) {
    return new Status(400, FAIL, "username not allowed");
  }

  // Check if modified user already exists
  const existingUser = await User.findOne({
    username: userData.username,
    _id: { $ne: userId },
  });
  if (existingUser) {
    console.log("User exists");
    return new Status(400, USER_EXISTS, "user exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const modifiedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      username: userData.username,
      password: hashedPassword,
    },
    {
      new: true,
    }
  );

  console.log(modifiedUser);

  // If no error, return success status.
  return new Status(201, SUCCESS, "successfully modified user");
}

//TODO: need to write in any common file
function isAllowedUsername(username) {
  return (
    /^[_A-Za-z0-9\.]+$/.test(username) &&
    username.length < USERNAME_MAX_LENGTH &&
    username.length > USERNAME_MIN_LENGTH
  );
}

module.exports = { editUser };
