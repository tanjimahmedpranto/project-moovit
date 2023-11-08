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

        req.authUser = authUser

        res.locals.user = authUser.email

        console.log(`Authorized ${authUser.email}`)

        next()


    } catch (error) {
        return res.json({message: error.message})   
    }
}

module.exports = authorize