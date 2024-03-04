const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

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
app.use(express.static(path.join(__dirname, './build')));

// Database setup.
mongoose.connect(dbURI)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to DB'))

app.use('/api/users', usersRoute);
app.use('/api/events', eventsRoute);
app.use('/api/tags', tagsRoute);
app.use('/api/categories', categoriesRoute);

app.get('*', (req, res) => {
    const systemRoot = path.resolve(__dirname, '..')
    res.sendFile(path.join(systemRoot, 'frontend/build', 'index.html'));
});

app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


