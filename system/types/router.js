const express = require("express");
const router = express.Router();
var type = require("./typeController");
const typeController = require('./typeController');
const authorize = require("../middleware/authorize");

router.post('/create', authorize, async (req, res) => { 
    // console.log(res.locals.user);
    const creator = res.locals.user;
    const typeName = req.body.typeName;  

    const statusObject = await typeController.create(typeName, creator);
    
    res.status(statusObject.httpStatus).send({message: statusObject.message}); 
});
router.put('/update', authorize, async (req, res) => { 
    // console.log(res.locals.user);
    const modifier = res.locals.user;
    const newName = req.body.newName;  
    const id = req.body.id;

    const statusObject = await typeController.update(id, newName, modifier);
    
    res.status(statusObject.httpStatus).send({message: statusObject.message}); 
});
// router.post("/bulk_create", type.bulk_create);
// router.get("/get/:id", type.find);
// router.get("/getAll", type.findAll);
// router.put("/update/:id", type.update);
// router.delete("/delete/:id", type.delete);
// router.delete("/deleteAll", type.bulk_delete);

module.exports = router;
