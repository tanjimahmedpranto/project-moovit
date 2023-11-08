var EventService = require("../services/eventService");
const Status = require("../status/Status");
const {
  SUCCESS,
  FAIL,
  EVENT_EXISTS,
  EVENT_NOT_EXISTS,
} = require("../status/statusConstants");

exports.findAll = async (req, res) => {
  try {
    const events = await EventService.FindAll(req);
    if (events) {
      var status = new Status(200, SUCCESS, "Found", events);
    } else {
      var status = new Status(404, EVENT_NOT_EXISTS, "Not Found!!!");
    }
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.find = async (req, res) => {
  try {
    const event = await EventService.Find(req.params.id);
    if (event) {
      var status = new Status(201, SUCCESS, event);
    } else {
      var status = new Status(404, FAIL, "Event Not Found!!!");
    }
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.create = async (req, res) => {
  try {
    const eventData = await EventService.Create(req);
    var status = new Status(201, SUCCESS,"Event Added Successfully!!", eventData);
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.bulk_create = async (req, res) => {
  try {
    const eventData = await EventService.Bulk_Create(req);
    res.status(201).send(eventData);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const eventData = await EventService.Update(req);

    var status = new Status(201, SUCCESS, "Updated Successfully!!", eventData);
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await EventService.Delete(id);
    if (event) {
      var status = new Status(201, SUCCESS, "Deleted Successfully!!", event);
    } else {
      var status = new Status(404, SUCCESS, "Event not found!!", event);
    }
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.bulk_delete = async (req, res) => {
  try {
    const event = await EventService.Bulk_Delete();
    if (event) {
      var status = new Status(201, SUCCESS, "Deleted Successfully!!", event);
    } else {
      var status = new Status(404, SUCCESS, "Event not found!!", event);
    }
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};
