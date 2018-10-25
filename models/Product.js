const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  tag: {
    type: Array,
    required: true
  },
  related: {
    type: Number,
    required: true
  },
  otherproducts:{
    type: Array
  }
});

module.exports = Product = mongoose.model("Product", productSchema); // create model database