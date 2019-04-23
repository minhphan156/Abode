const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    link:{
        type:String
    },
    address: {
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    images:{   //display in search result page
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
        suitePrice:{
            type:Number
        }
    },
    star:{
        type:Number,
    },
    ta_rating:{
        type:Number,
    },
    hdc_rating:{
        type:Number,
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
    top_spots:{
        type:Array
    },
    amenities: {
        type:Array
    },
    airports:{
        type:Array
    },
    reviews:{
        type:Array
    },
    bookingStats:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    }
},{ usePushEach: true });

module.exports = Hotel = mongoose.model('hotels',HotelSchema)