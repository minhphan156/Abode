const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    customerID:{
        type:Schema.Types.ObjectId,
        ref:'customers'
    },
    hotelID:{
        type:Schema.Types.ObjectId,
        ref:'hotels'
    },
    check_in_date: {
        type:Date,
        required:true
    },
    check_out_date: {
        type:Date,
        required:true
    },
    numOfRoom: {
        type:Number,
        required:true
    },
    reservedDate:{
        type:Date,
        default: Date.now
    },
    status:{     // 0 stand for just booked, 1 for check-in, 2 for check-out, 3 for cancel
        type:Number,
        default:0
    }
})

module.exports = Booking = mongoose.model("bookings", BookingSchema);