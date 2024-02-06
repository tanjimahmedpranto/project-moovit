const Category = require('../models/categorySchema');
const {Status, SUCCESS, FAIL} = require('../../status');

// Get categories.
async function getCategories(){
    // Get the total number of documents in the collection.
    const categories = await Category.find({}).select('categoryName _id');
    
    if(categories.length > 0) {
        return(new Status(200, SUCCESS, categories));
    } else {
        return(new Status(404, FAIL, []));
    }
}

module.exports = {getCategories};

