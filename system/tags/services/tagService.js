var Tag = require("../models/tagSchema");

const TagService = {
  FindAll: (req) => {
    return Tag.find();
  },

  Find: (id) => {
    return Tag.findOne({ _id: id });
  },



  Update: async (req) => {
    console.log(req.params.id);
    return await Tag.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
            tagName: req.body.tagName,
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
    return await Tag.findOneAndDelete({ _id: id });
  },

  Bulk_Delete: async () => {
    return await Tag.deleteMany();
  },
};

module.exports = TagService;
