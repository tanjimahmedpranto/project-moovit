const express = require("express");
const router = express.Router();
var type = require("../controllers/typeController");

router.post("/create", type.create);
router.post("/bulk_create", type.bulk_create);
router.get("/get/:id", type.find);
router.get("/getAll", type.findAll);
router.put("/update/:id", type.update);
router.delete("/delete/:id", type.delete);
router.delete("/deleteAll", type.bulk_delete);

module.exports = router;
