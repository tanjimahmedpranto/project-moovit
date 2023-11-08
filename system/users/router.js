const express = require('express');
const router = express.Router();
const userControlller = require("./userController");
const {SUCCESS, FAIL} = require('../status');

router.post('/register', async (req, res) => {   
    // Handle request.
    const username = req.body.username;   
    const password = req.body.password; 
    const statusObject = await userControlller.registerUser(username, password);
   
    // Send back the status and message.
    res.status(statusObject.httpStatus).send({message: statusObject.message});
});

router.post('/login', async (req, res) => {   
    // Handle request.
    const username = req.body.username;   
    const password = req.body.password; 
    const statusObject = await userControlller.login(username, password);

    // Send back the status and message.
    res.status(statusObject.httpStatus).send({message: statusObject.message});
    
});

module.exports = router;