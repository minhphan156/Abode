const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  // Assuming that we want authors to be identifiable
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    // ingredients is an array of products
    type: [],
    required: true
  }
});

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
