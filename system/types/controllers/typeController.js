var TypeService = require("../services/typeService");
const Status = require("../status/Status");
const {
  SUCCESS,
  FAIL,
  TYPE_EXISTS,
  TYPE_NOT_EXISTS,
} = require("../status/statusConstants");

exports.findAll = async (req, res) => {
  try {
    const types = await TypeService.FindAll(req);
    if (types) {
      var status = new Status(200, SUCCESS, "Found", types);
    } else {
      var status = new Status(404, TYPE_NOT_EXISTS, "Not Found!!!");
    }
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.find = async (req, res) => {
  try {
    const type = await TypeService.Find(req.params.id);
    if (type) {
      var status = new Status(201, SUCCESS, type);
    } else {
      var status = new Status(404, FAIL, "Type Not Found!!!");
    }
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.create = async (req, res) => {
  try {
    const typeData = await TypeService.Create(req);
    var status = new Status(201, SUCCESS,"Type Added Successfully!!", typeData);
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.bulk_create = async (req, res) => {
  try {
    const typeData = await TypeService.Bulk_Create(req);
    res.status(201).send(typeData);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const typeData = await TypeService.Update(req);

    var status = new Status(201, SUCCESS, "Updated Successfully!!", typeData);
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const type = await TypeService.Delete(id);
    if (type) {
      var status = new Status(201, SUCCESS, "Deleted Successfully!!", type);
    } else {
      var status = new Status(404, SUCCESS, "Type not found!!", type);
    }
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};

exports.bulk_delete = async (req, res) => {
  try {
    const type = await TypeService.Bulk_Delete();
    if (type) {
      var status = new Status(201, SUCCESS, "Deleted Successfully!!", type);
    } else {
      var status = new Status(404, SUCCESS, "Type not found!!", type);
    }
  } catch (error) {
    var status = new Status(500, FAIL, error.message);
  }

  res.send(status);
};
