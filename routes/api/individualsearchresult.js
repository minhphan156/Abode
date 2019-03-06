var express = require('express');
var router = express.Router();
var Hotel = require('../models/Hotel');

router.get('/individual-search-result/:id', function (req, res, next){
    var hotelId = req.params.id;
    Hotel.findById(hotelId, function(err, hotel){
        if (err){
            return console.log("Hotel does not exist.");
        }
        return res.send({ name: hotel.name, hotelID: hotel._id, street: hotel.street, city: hotel.city, img: hotel.img, price: hotel.price, star_rating: hotel.star_rating, guest_rating: hotel.guest_rating,
            guest_review: hotel.guest_review, amenities: hotel.amenities, airports: hotel.airports
            //or res.json(hotel)
        });
    });
});

module.exports = router;