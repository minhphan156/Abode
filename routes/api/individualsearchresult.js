var express = require('express');
var router = express.Router();
var Hotel = require('../../models/Hotel');

router.get('/individual-search-result/:id', (req,res) =>{
    Hotel.findById(req.params.id)
    .then(hotel => res.send({ name: hotel.name, hotelID: hotel._id, street: hotel.street, city: hotel.city, img: hotel.img, price: hotel.price, star_rating: hotel.star_rating, guest_rating: hotel.guest_rating, guest_review: hotel.guest_review, amenities: hotel.amenities, airports: hotel.airports}))
    .catch(err => res.status(404));
})

module.exports = router;