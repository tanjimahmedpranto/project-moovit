/**
 * Type represents the categories like: Marathons, Cycling Races, Rock Climbing Competitions
 */

const mongoose = require('mongoose');
const baseSchema = require('../../base_schema/baseSchema');

const typeSchema = new mongoose.Schema({ 
    typeName: {
        type: String,
        required: true,
        unique: true
    },
    ...baseSchema
});
typeSchema.set('timestamps', true);

module.exports = mongoose.model('Type', typeSchema, "types")