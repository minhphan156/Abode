const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

module.exports = Customer = mongoose.model("customers", BookingSchema);