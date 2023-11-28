const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController");
const authorize = require("../middleware/authorize");
const asyncErrorHandler= require("../utilities/asyncErrorHandler");

// Create category.
router.post("/create", authorize, asyncErrorHandler(async (req, res, next) => {
  const creator = res.locals.user;
  const categoryName = req.body.categoryName;

  const statusObject = await categoryController.create(categoryName, creator);
  if (statusObject)
    res.status(statusObject.httpStatus).send({ message: statusObject.message });
}));

// Update category.
router.put("/update", authorize, async (req, res) => {
  const modifier = res.locals.user;
  const newName = req.body.newName;
  const id = req.body.id;

  const statusObject = await categoryController.update(id, newName, modifier);
  res.status(statusObject.httpStatus).send({ message: statusObject.message });
});

module.exports = router;
