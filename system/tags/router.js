const express = require("express");
const router = express.Router();
const tagController = require("./tagController");
const authorize = require("../middleware/authorize");
const asyncErrorHandler = require("../utilities/asyncErrorHandler");

//get all
router.get(
  "/getAll",
  authorize,
  asyncErrorHandler(async (req, res, next) => {
    const tags = await tagController.getTags();
    res.status(tags.httpStatus).send(tags.message);
  })
);

// Create tag.
router.post(
  "/create",
  authorize,
  asyncErrorHandler(async (req, res, next) => {
    const creator = res.locals.user;
    const tagName = req.body.tagName;

    const statusObject = await tagController.create(tagName, creator);
    res.status(statusObject.httpStatus).send({ message: statusObject.message });
  })
);

// Update tag.
router.put(
  "/update",
  asyncErrorHandler(async (req, res, next) => {
    const modifier = res.locals.user;
    const newName = req.body.newName;
    const id = req.body.id;

    const statusObject = await tagController.update(id, newName, modifier);
    res.status(statusObject.httpStatus).send({ message: statusObject.message });
  })
);

module.exports = router;
