var express = require('express');
var router = express.Router();
var Hotel = require('../models/Hotel');

router.get('/individual-search-result/:id', function (req, res, next){
    var hotelId = req.params.id;
    Hotel.findById(hotelId, function(err, hotel){
        if (err){
            return console.log("Hotel does not exist.");
        }
        return res.send({ name: name, hotelID: id, street: street, city: city, img: img, price: price, star_rating: star_rating, guest_rating: guest_rating,
            guest_review: guest_review, amenities: amenities, airports: airports
            //or res.json(hotel)
        });
    });
});

module.exports = router;