const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const logger = require("winston");

// use to connect with mongoDB
const mongoose = require("mongoose");

// api routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const hotel = require("./routes/api/hotels");
const book = require("./routes/api/bookin");
const landing = require("./routes/api/landing");
// get some functionalities from express library like get() function
const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => logger.info("MongoDB Connected")) // if success do this
  .catch(err => logger.error(`MongoDB error: ${err}`)); // if fail do this

// Passport middleware
app.use(passport.initialize());

// bring passport library to config/passport.js
require("./config/passport")(passport);

// Use Routes
// this will append to home route 'localHost:5000/api/users/{what ever users.js dictate}'
app.use("/api/users", users);
// this will append to home route 'localHost:5000/api/profile/{what ever profile.js dictate}'
app.use("/api/profile", profile);
// individual search result route
app.use("/api/hotel", hotel);
// landing page w/ random cities
app.use("/api/landing", landing);

// this will append to home route 'localHost:5000/api/booking/{what ever book.js dictate}'
app.use("/api/booking", book);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("front_end/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front_end", "build", "index.html"));
  });
}

// using port deployed to Heroku || use local port 5000
const port = process.env.PORT || 5000;

// listen to port when server is running
app.listen(port, () => console.log(`Server running on port ${port}`));

// NOTE: At this point , go to terminal and do $ npm run server
