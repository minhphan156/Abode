var express = require('express');
var router = express.Router();
var Hotel = require('../../models/Hotel');
var checkAvailability = require('../../validation/checkAvailibility.js')

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