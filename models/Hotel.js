const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    street: {
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    img:{   //display in search result page
        type:Array
    },
    price:{         
        singlePrice:{
            type:Number
        },
        doublePrice:{
            type:Number
        },
        kingPrice:{
            type:Number
        },
        studioPrice:{
            type:Number
        }
    },
    star_rating:{
        type:Number,
    },
    guest_rating:{
        type:Number,
    },
    guest_review:{
        type:String
    },
    roomTypeAndNumber:{    //types of rooms and how many rooms are avaliable
        single: [{
            dates:[{          
                checkin:Date,
                checkout:Date,
                bookingID:String,
            }]
        }],
        double: [{
            dates:[{          
                checkin:Date,
                checkout:Date,
                bookingID:String,
            }]
        }],
        king: [{
            dates:[{          
                checkin:Date,
                checkout:Date,
                bookingID:String,
            }]
        }],
        studio: [{
            dates:[{          
                checkin:Date,
                checkout:Date,
                bookingID:String,
            }]
        }]
    },
    amenities: {
        type:Array
    },
    airports:{
        type:Array
    }
})

module.exports = Hotel = mongoose.model('hotels',HotelSchema)