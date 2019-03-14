const express = require("express");
const router = express.Router();

const checkAvalibity = require("../../validation/checkAvailableHotels");
var checkAvailability = require('../../validation/checkAvailibility.js')

const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");

// just example for how to start
// everything in this 
// write coments for you api call like /api/hotel/*
// like below is /api/hotel/searchdo
// router.get('/searchdo',(req,res)=>{
//     console.log("hotle.js")
// })
// router.post('/something',(res,req)=>{
// })

// @route GET api/hotel/search
// @desc Search Overview
router.get('/search',(req,res)=>{
    var searchKey = req.body.destinationName;
    var date = {
        checkin:req.body.checkIn,
        checkout:req.body.checkOut
    };
    var numberRooms = req.body.numberRooms;
    var startIndex = req.body.lastIndex;
    const NUM_RESULTS = req.body.numResults;
    const regex = new RegExp(searchKey,"ig");
    //.split("").join('*')
    console.log(regex)
    Hotel.find({$or:[{name:regex}, {city:regex},{airports:regex}]}).then((doc,err)=>{
        if(err) res.status(400).json(err);
        // var startIndex = 5 * pageNumber - 5;
        var result = [];
        let bookingID = "bookid"
        while(result.length < NUM_RESULTS && doc[startIndex] !== undefined){
            var arr = doc[startIndex]
            let singleAvaliable = checkAvalibity(doc[startIndex].roomTypeAndNumber.single, date, numberRooms, bookingID);
            let doubleAvaliable = checkAvalibity(doc[startIndex].roomTypeAndNumber.double, date, numberRooms, bookingID);
            let kingAvaliable = checkAvalibity(doc[startIndex].roomTypeAndNumber.king, date, numberRooms, bookingID);
            let studioAvaliable = checkAvalibity(doc[startIndex].roomTypeAndNumber.studio, date, numberRooms, bookingID);
           
            if (singleAvaliable || doubleAvaliable || kingAvaliable || studioAvaliable){
                item = {
                    name:arr.name,
                    hotelID:arr._id,
                    street:arr.street,
                    city:arr.city,
                    price:arr.price.single,
                    star_rates:arr.star_rating,
                    guest_rate:arr.guest_rating,
                    img:arr.img[0]
                }
                result.push(item);
            }
            startIndex++;
        }

        resultPack = {
            "lastIndex": startIndex,
            "nextExists": (doc[startIndex] !== undefined) ? true : false,
            "results": result
        }

        res.status(200).json(resultPack);

    })

})

router.get('/individual', (req,res) =>{
    var date = {
        checkin: req.query.checkIn,
        checkout: req.query.checkOut
    };
    var numberOfRooms = req.query.numberRooms;
    let singleRoomAvailability = true;
    let doubleRoomAvailability = true;
    let kingRoomAvailablity = true;
    let studioRoomAvailability = true;
    Hotel.findById(req.query.id)
    .then(hotel => {
        if ((typeof date.checkin !== 'undefined') && (typeof date.checkout !== 'undefined')){
            if(checkAvailability(hotel.roomTypeAndNumber.single, date, numberOfRooms, "PlaceHolder").length == 0)
                singleRoomAvailability = false;
            if(checkAvailability(hotel.roomTypeAndNumber.double, date, numberOfRooms, "PlaceHolder").length == 0)
                doubleRoomAvailability = false;
            if(checkAvailability(hotel.roomTypeAndNumber.king, date, numberOfRooms, "PlaceHolder").length == 0)
                kingRoomAvailablity = false;
            if(checkAvailability(hotel.roomTypeAndNumber.studio, date, numberOfRooms, "PlaceHolder").length == 0)
                studioRoomAvailability = false;
        }
        res.json({singleAvailability: singleRoomAvailability, doubleAvailability: doubleRoomAvailability, kingAvailability: kingRoomAvailablity, studioAvailability: studioRoomAvailability, name: hotel.name, hotelID: hotel._id, street: hotel.street, city: hotel.city, img: hotel.img, price: hotel.price, star_rating: hotel.star_rating, guest_rating: hotel.guest_rating,
            guest_review: hotel.guest_review, amenities: hotel.amenities, airports: hotel.airports, })
    })
    .catch(err => res.status(404));

    })

module.exports = router;