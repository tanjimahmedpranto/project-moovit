const Category = require("../models/categorySchema");
const { Status, SUCCESS, FAIL } = require("../../status");
const { isNullOrUndefined } = require("../../utilities/validationUtils");

// Create category.
async function createCategory(categoryName, creator) {
  if (isNullOrUndefined(categoryName)) {
    return new Status(400, FAIL, "Category name can not be null");
  }
  const newCategory = new Category({
    categoryName: categoryName,
    createdBy: creator,
  });
  // Check whether category already exists.
  const categoryExists = await Category.findOne({ categoryName });
  if (categoryExists) {
    return new Status(400, FAIL, "Category exists");
  }

  // Add category to database.
  await newCategory.save();

  // If no error, return success status.
  return new Status(201, SUCCESS, "new category created");
}

module.exports = { createCategory };
