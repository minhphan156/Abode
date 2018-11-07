const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  // Assuming that we want authors to be identifiable
  userID: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  author: {
    type: String
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
    type: {},
    required: true
  }
});

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
