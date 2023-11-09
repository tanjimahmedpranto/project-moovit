var Type = require("../models/typeSchema");

const TypeService = {
  FindAll: (req) => {
    return Type.find();
  },

  Find: (id) => {
    return Type.findOne({ _id: id });
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
