const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const cors = require('cors')

const usersRoute = require('./users/router.js');
const typesRoute = require('./types/router.js');
const eventsRoute = require('./events/router.js');

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
app.use('/types', typesRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


