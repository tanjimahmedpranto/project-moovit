const mongoose = require('mongoose');
const baseSchema = require('../../base_schema/baseSchema');

const tagSchema = new mongoose.Schema({ 
    tagName: {
        tag: String,
        required: true,
        unique: true
    },
    ...baseSchema
});
tagSchema.set('timestamps', true);

module.exports = mongoose.model('Tag', tagSchema, "tags")