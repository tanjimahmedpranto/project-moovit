const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true, // Removes leading and trailing whitespaces
        match: /^\S+@\S+\.\S+$/, // Basic email format validation using a regex
    }
}, { 
    timestamps: true,
})

module.exports = mongoose.model('Login', loginSchema, "users")