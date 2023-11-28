const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const cors = require('cors')

const usersRoute = require('./users/router.js');
const tagsRoute = require('./tags/router.js');
const categoriesRoute = require('./categories/router.js');
const eventsRoute = require('./events/router.js');
const CustomError = require('./utilities/customError.js');
const globalErrorHandler = require('./utilities/errorController.js')

require('dotenv').config()
const dbURI = process.env.DB_URI

// Server setup.
const app = express();
const port = 8080;
app.use(express.json())
app.use(cors());    
app.use(express.urlencoded({extended: true}))

// Database setup.
mongoose.connect(dbURI)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to DB'))

app.get('/', (req, res) => {    
    res.send('Hello World!');
});
app.use('/users', usersRoute);
app.use('/events', eventsRoute);
app.use('/tags', tagsRoute);
app.use('/categories', categoriesRoute);
app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});
app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


