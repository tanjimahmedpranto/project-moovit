const baseSchema = {
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: String,
    //,required: true
  },
  modifiedBy: {
    type: String,
    //,required: true
  }
};

module.exports = baseSchema;
