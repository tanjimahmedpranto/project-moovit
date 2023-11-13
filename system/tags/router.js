const express = require("express");
const router = express.Router();
const tagController = require('./tagController');
const authorize = require("../middleware/authorize");

// Create tag.
router.post('/create', authorize, async (req, res) => { 
    const creator = res.locals.user;
    const tagName = req.body.tagName;  

    const statusObject = await tagController.create(tagName, creator);
    res.status(statusObject.httpStatus).send({message: statusObject.message}); 
});

// Update tag.
router.put('/update', authorize, async (req, res) => { 
    const modifier = res.locals.user;
    const newName = req.body.newName;  
    const id = req.body.id;

    const statusObject = await tagController.update(id, newName, modifier);
    res.status(statusObject.httpStatus).send({message: statusObject.message}); 
});

module.exports = router;
