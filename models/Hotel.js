const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    name :{
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    coverImage:{   //display in search result page
        type:Array
    },
    price:{         // 
        singlePrice:{
            type:Number
        },
        doublePrice:{
            type:Number
        },
        KingPrice:{
            type:Number
        },
        studioPrice:{
            type:Number
        }
    },
    star_rating:{
        type:Number,
        require:true
    },
    guest_rating:{
        type:Number,
        require:true
    },
    guest_review:{

    },
    roomTypeAndNumber:{    //types of rooms and how many rooms are avaliable
        single: [{
            dates:[{          
                checkin:Date,
                checkout:Date,
            }]
        }],
        double: [{
            dates:[{          
                checkin:Date,
                checkout:Date}]
        }],
        king: [{
            dates:[{          
                checkin:Date,
                checkout:Date,
            }]
        }],
        studio: [{
            dates:[{          
                checkin:Date,
                checkout:Date}]
        }]
    },
    amenities: {
        parking: {
            type:Boolean,
            default: true
        },
        wifi: {
            type:Boolean,
            default: true
        },
        fitness: {
            type:Boolean,
            default: true
        },
        breakfast: {
            type:Boolean,
            default: true
        },
        pool: {
            type:Boolean,
            default: true
        },
        laundry: {
            type:Boolean,
            default: true
        },
        shuttle: {
            type:Boolean,
            default: true
        },
        refridgerator: {
            type:Boolean,
            default: true
        }
    }
})

module.export = Hotel = mongoose.model('hotels',HotelSchema)