const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const cartSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  order: {
    type: Array,
    required: true
  }
});

module.exports = Cart = mongoose.model("Cart", cartSchema); // create model database
