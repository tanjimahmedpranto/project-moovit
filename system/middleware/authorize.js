require('dotenv').config()
const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {
    try {
        // Get header.
        const authHeader = req.headers['authorization']
        
        // Get the bearer token.
        const token = authHeader.split(' ')[1]

        // Verify the user.
        const authUser = jwt.verify(token, process.env.JWT_SECRET)
        res.locals.user = authUser.subject;
        next()


    } catch (error) {
        return res.status(401).json({message: error.message})   
    }
}

module.exports = authorize