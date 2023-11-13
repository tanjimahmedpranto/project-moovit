const mongoose = require('mongoose');
const baseSchema = require('../../base_schema/baseSchema');

const categorySchema = new mongoose.Schema({ 
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    ...baseSchema
});
categorySchema.set('timestamps', true);

module.exports = mongoose.model('Tag', categorySchema, "categorys")