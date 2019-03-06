const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  rewardPoints: {
    type:Number
  },
  admin:{
    type:Number,
    default:0
  },
  customerID:{
    type:Schema.Types.ObjectId,
    ref:'customers'
  }
});

module.exports = User = mongoose.model("users", UserSchema); // create model database
