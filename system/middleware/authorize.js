require('dotenv').config()
const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {
    try {
        // Get the bearer token.
        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[1]

        // Verify the user and save.
        const authUser = jwt.verify(token, process.env.JWT_SECRET)
        res.locals.user = authUser.subject;
        
        next()
    } catch (error) {
        return res.status(401).json({message: error.message})   
    }
}

module.exports = authorize