const Tag = require('../models/tagSchema');
const {Status, SUCCESS, FAIL} = require('../../status');

// Delete tag.
async function deleteTag(id){
    //cascade delete
}

module.exports = {deleteTag};

