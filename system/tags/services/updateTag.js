const Tag = require("../models/tagSchema");
const { Status, FAIL, SUCCESS } = require("../../status");
const { isNullOrUndefined } = require("../../utilities/validationUtils");

// Update tag.
async function updateTag(id, newName, modifier) {
  if (isNullOrUndefined(id, tagName)) {
    return new Status(400, FAIL, "Id or Tag name can not be null");
  }
  // Attempt to find target and update
  const tagUpdateResult = await Tag.findOneAndUpdate(
    { _id: id },
    { $set: { tagName: newName, modifiedBy: modifier } },
    { new: true }
  );
  return new Status(200, SUCCESS, "tag edited");
}

module.exports = { updateTag };
