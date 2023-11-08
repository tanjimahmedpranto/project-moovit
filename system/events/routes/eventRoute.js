const express = require("express");
const router = express.Router();
var event = require("../controllers/eventController");

router.post("/create", event.create);
router.post("/bulk_create", event.bulk_create);
router.get("/get/:id", event.find);
router.get("/getAll", event.findAll);
router.put("/update/:id", event.update);
router.delete("/delete/:id", event.delete);
router.delete("/deleteAll", event.bulk_delete);

module.exports = router;
