const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

//TODO: history and recipe will most likely have to be updated in order to make them work.
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  address: {
    street: {
      type: String,
      required: true
    },
    apartment: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    homeState: {
      type: String,
      required: true
    }
  },

  history: {
    type: Array
  },
  recipe: {
    type: Array
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
