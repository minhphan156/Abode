const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const City = new Schema({
  cityName: {
    type: String,
    required: true
  },

  imgMain: {
    type: String, //url
    required: true
  },

  imgAlt: {
    type: Array
  }
});

module.exports = City = mongoose.model("cities", CitySchema);
