var Type = require("../models/typeSchema");

const TypeService = {
  FindAll: (req) => {
    return Type.find();
  },

  Find: (id) => {
    return Type.findOne({ _id: id });
  },

  Create: async (req) => {
    var type = new Type({
      typeName: req.body.typeName,
      createdBy: "logged in user", //logged in user
    });
    return await type.save();
  },

  Bulk_Create: async (req) => {
    const types = req.body;

    if (!Array.isArray(types)) {
      return res.status(400).send({
        message: "Request body should be an array of types.",
      });
    }

    /** save all types */
    return await Type.insertMany(types);
  },

  Update: async (req) => {
    console.log(req.params.id);
    return await Type.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
            typeName: req.body.typeName,
            isActive: req.body.isActive,
            modifiedBy: "logged in user", //logged in user
        },
      },
      {
        new: true,
      }
    );
  },

  Delete: async (id) => {
    return await Type.findOneAndDelete({ _id: id });
  },

  Bulk_Delete: async () => {
    return await Type.deleteMany();
  },
};

module.exports = TypeService;
