const express = require("express");
const router = express.Router();

const checkAvalibity = require("../../validation/checkAvailableHotels");
var checkAvailability = require('../../validation/checkAvailibility.js')

const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");

// @route GET api/hotel/search
// @desc Search Overview
router.get('/search',(req,res)=>{

    var searchKey = req.query.destinationName;
    var date = {
        checkin:req.query.checkIn.replace('"','').replace('"',''),
        checkout:req.query.checkOut.replace('"','').replace('"',''),
    };
    var numberRooms = parseInt(req.query.numberRooms);
    var startIndex = req.query.lastIndex;
    var pageNumber = req.query.pageNumber;

    const NUM_RESULTS = req.query.numResults;

    const regex = new RegExp(searchKey,"ig");
    //.split("").join('*')
    //console.log(regex)
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
                    price:arr.price.singlePrice,
                    star_rates:arr.star_rating,
                    guest_rate:arr.guest_rating,
                    img:arr.img[0]
                }
                result.push(item);
            }
            startIndex++;
        }

        resultPack = {
            pageNumber:pageNumber,
            "lastIndex": startIndex,
            "nextExists": (doc[startIndex] !== undefined) ? true : false,
            "results": result
        }

        res.status(200).json(resultPack);

    })

})


// @route GET api/hotel/individual
// @desc individual page
router.get('/individual', (req,res) =>{
    var date = {
        checkin: req.query.checkIn.replace('"','').replace('"',''),
        checkout: req.query.checkOut.replace('"','').replace('"','')
    };
    var numberOfRooms = parseInt(req.query.numberRooms);
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