var express = require('express');
var router = express.Router();
var Hotel = require('../../models/Hotel');
var Booking = require('../../models/booking');

router.get('/individual-search-result/:id', (req,res) =>{
    var checkin = [];
    var checkout = [];
    Hotel.findById(req.params.id)
    .then(hotel => {
        Booking.find({hotelID: hotel._id})
        .then(allBookings => {
            if (allBookings){
            allBookings.forEach(function(booking){
                checkin.push(booking.check_in_date);
                checkout.push(booking.check_out_date);
            })
            }
            res.json({check_in_date: checkin, check_out_date: checkout,name: hotel.name, hotelID: hotel._id, street: hotel.street, city: hotel.city, img: hotel.img, price: hotel.price, star_rating: hotel.star_rating, guest_rating: hotel.guest_rating, guest_review: hotel.guest_review, amenities: hotel.amenities, airports: hotel.airports})
        })
    })
    .catch(err => res.status(404));
})

module.exports = router;