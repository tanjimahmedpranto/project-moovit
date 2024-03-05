const Tag = require("../models/tagSchema");
const { Status, SUCCESS, FAIL } = require("../../status");
const { isNullOrUndefined } = require("../../utilities/validationUtils");

// Create tag.
async function createTag(tagName, creator) {
  if (isNullOrUndefined(tagName)) {
    return new Status(400, FAIL, "Tag name can not be null");
  }
  const newTag = new Tag({ tagName: tagName, createdBy: creator });
  try {
    // Check whether tag already exists.
    const tagExists = await Tag.findOne({ tagName });
    if (tagExists) {
      return new Status(400, FAIL, "Tag exists");
    }

    // Add tag to database.
    const tagCreationResult = await newTag.save();

    if (tagCreationResult.acknowledged) {
      console.log(tagCreationResult);
      return new Status(500, FAIL, "Something happened");
    }
  } catch (e) {
    console.error(e);
  }

  // If no error, return success status.
  console.log("Tag created:", tagName);
  return new Status(201, SUCCESS, "new tag created");
}

module.exports = { createTag };
