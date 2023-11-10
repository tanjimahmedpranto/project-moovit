const express = require('express');
const router = express.Router();
const eventController = require("./eventController");
const authorize = require('../middleware/authorize');

router.get('/', async (req, res) => {
    eventController.getEvents();   
    res.status(200).send("Yo");
});

router.get('/:id', async (req, res) => {
    eventController.getSingleEvent();   
    res.status(200).send("Yo");
});

// Create event.
router.post('/create', authorize, async (req, res) => {
    const {eventName, description, date, maxParticipants, location, locationName,host, duration} = req.body;
    const creator = res.locals.user;
    const eventData = {eventName, description, date, maxParticipants, location, locationName,host, duration, creator} 

    const createResult = await eventController.createEvent(eventData);   
    res.status(createResult.httpStatus).send(createResult.message);
});

router.put('/update/:id', async (req, res) => {
    eventController.updateEvent();   
    res.status(200).send("Yo");
});

module.exports = router;