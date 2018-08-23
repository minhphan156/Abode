const express = require('express');

// use to connect with mongoDB
const mongoose = require('mongoose');

// api routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

// get some functionalities from express library like get() function
const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected')) //if success do this
    .catch(err => console.log(err)); //if fail do this

// home route
// req-request , res-response
app.get('/', (req, res) => res.send('Hello world'));

// Use Routes
// this will append to home route 'localHost:5000/api/users/{what ever users.js dictate}
app.use('/api/users', users);
// this will append to home route 'localHost:5000/api/profile/{what ever profile.js dictate}
app.use('/api/profile', profile);

// using port deployed to Heroku || use local port 5000
const port = process.env.PORT || 5000;

// listen to port when server is running
app.listen(port, () => console.log(`Server running on port ${port}`));
//NOTE: At this point , go to terminal and do $ npm run server