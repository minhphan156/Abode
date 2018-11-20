const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  // The ID of the user that created the recipe
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  author: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  steps: [
    {
      type: String,
      required: true
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [
    {
      type: String,
      required: true
    }
  ],
  ingredientsProducts: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product"
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
