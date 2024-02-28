const express = require("express");
const router = express.Router();
const eventController = require("./eventController");
const authorize = require("../middleware/authorize");
const multer = require("multer");
const asyncErrorHandler = require("../utilities/asyncErrorHandler");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  eventController.getEvents();
  res.status(200).send("Yo");
});

router.get("/:id", async (req, res) => {
  const requestedId = req.params?.id;
  const singleResult = await eventController.getSingleEvent(requestedId);
  res.status(singleResult.httpStatus).send(singleResult.message);
});
//get user role in the event
router.get(
  "getUserRole/:eventId/:userId",
  asyncErrorHandler(async (req, res, next) => {
    const eventId = req.params?.eventId;
    const userId = req.params?.userId;
    const singleResult = await eventController.getUserRole(eventId, userId);
    
    res.status(singleResult.httpStatus).send(singleResult.message);
  })
);

router.get(
  "/getRandomEvents/:numOfEvents",
  // authorize,
  asyncErrorHandler(async (req, res, next) => {
    const numOfEvents = req.params?.numOfEvents;
    const result = await eventController.getRandomEvents(numOfEvents);
    res.status(result.httpStatus).send(result.message);
  })
);

// Create event.
router.post("/create", authorize, upload.single("file"), async (req, res) => {
  const {
    eventName,
    description,
    date,
    maxParticipants,
    location,
    locationName,
    host,
    duration,
    blurhash,
  } = req.body;
  const creator = res.locals.user;
  const image = req.file;
  const tags = JSON.parse(req.body.tags);
  const categories = JSON.parse(req.body.categories);

  const eventData = {
    eventName,
    description,
    date,
    maxParticipants,
    location,
    locationName,
    host,
    duration,
    creator,
    image,
    blurhash,
    //time,
    tags,
    categories,
  };
  const createResult = await eventController.createEvent(eventData);
  res.status(createResult.httpStatus).send(createResult.message);
});

router.post(
  "/getFiltedEvnets",
  asyncErrorHandler(async (req, res, next) => {
    const getFiltedEvents = await eventController.getFiltedEvents(req.body);

    res.status(getFiltedEvents.httpStatus).send(getFiltedEvents.message);
  })
);

//enrol for event 
router.post(
  "joinEvent/:eventId/:userId",
  asyncErrorHandler(async (req, res, next) => {
    const eventId = req.params?.eventId;
    const userId = req.params?.userId;
    const singleResult = await eventController.joinEvent(eventId, userId);
    res.status(singleResult.httpStatus).send(singleResult.message);
  })
);

router.put("/update/:id", async (req, res) => {
  eventController.updateEvent();
  res.status(200).send("Yo");
});

module.exports = router;
