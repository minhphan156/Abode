const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  cityName: {
    type: String,
    required: true
  },

  inspire: {
    type: String
    //required: true
  },

  imgMain: {
    type: String, //url
    required: true
  },

  imgAlt: {
    type: Array
  },

  bookings: {
    type: Number
  }
});

module.exports = City = mongoose.model("cities", CitySchema);
