const Category = require("../models/categorySchema");
const { Status, SUCCESS, FAIL } = require("../../status");

// Create category.
async function createCategory(categoryName, creator) {
  const newCategory = new Category({
    categoryName: categoryName,
    creator: creator,
  });
  try {
    // Check whether category already exists.
    const categoryExists = await Category.findOne({ categoryName });
    if (categoryExists) {
      return new Status(400, FAIL, "Category exists");
    }

    // Add category to database.
    const categoryCreationResult = await newCategory.save();

    if (categoryCreationResult.acknowledged) {
      console.log(categoryCreationResult);
      return new Status(500, FAIL, "Something happened");
    }
  } catch (e) {
    console.error(e);
  }

  // If no error, return success status.
  return new Status(201, SUCCESS, "new category created");
}

module.exports = { createCategory };
