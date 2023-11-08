const express = require('express');
const router = express.Router();
const eventController = require("./eventController");
const {SUCCESS, FAIL} = require('../status');

router.post('/create', async (req, res) => {   
    // Handle request.
    // Send back the status and message.
    const statusObject = await eventController.createEvent();
   
    // Send back the status and message.
    res.status(statusObject.httpStatus).send({message: statusObject.message});
});

module.exports = router;