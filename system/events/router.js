const express = require('express');
const router = express.Router();
const eventController = require("./eventController");

router.get('/', async (req, res) => {
    eventController.getEvents();   
    res.status(200).send("Yo");
});

router.get('/:id', async (req, res) => {
    eventController.getSingleEvent();   
    res.status(200).send("Yo");
});

router.put('/update/:id', async (req, res) => {
    eventController.updateEvent();   
    res.status(200).send("Yo");
});

module.exports = router;