const express = require("express");
const router = express.Router();

const checkAvailable = require("../../validation/checkAvailableHotels");
var checkAvailability = require('../../validation/checkAvailibility.js')
const Hotel = require("../../models/Hotel");

// @route POST api/hotel/review
// @desc Add a review and comment for a specific hotel
router.post('/review',(req,res)=>{
    ```
    REQUEST SCHEMA

    {
        comment: String,
        rating: int, // between 1 and 5 inclusive
        hotelID: String
    }
    ```

    const newReview = {
        date: 'time',
        comment: req.body.comment,
        rating: req.body.rating
    }

    Hotel.findById(req.body.hotelID).then(doc => {
        doc.reviews.push(req.body.comment);

        var ratingAvg = doc.hdc_rating;
        ratingAvg += req.body.rating;
        ratingAvg /= (doc.reviews.length + 1)

        doc.hdc_rating = ratingAvg;

        doc.save((err) => {
            return res.send(400).json({
                err: "Cannot add review"
            })
        })


    }).catch(err => {
        return res.send(404).json({
            err: "Cannot find Hotel"
        })
    });

});

// @route GET api/hotel/search
// @desc Search Overview with Sorting and Filtering
router.get('/search',(req,res)=>{
    //Sorting
    var sortByObject = req.query.sortObject;
    if (typeof sortByOject !== 'undefined'){
        switch (sortByObject){
            case "price":
                sortByObject = {price: 1};
                break;
            case "-price":
                sortByObject = {price: -1};
                break;
            case "name":
                sortByObject = {name: 1};
                break;
            case "-name":
                sortByObject = {name: -1};
                break;
            case "star":
                sortByObject = {star: 1};
                break;
            case "-star":
                sortByObject = {star: -1};
                break;
            case "hdc_rating":
                sortByObject = {hdc_rating: 1};
                break;
            case "-hdc_rating":
                sortByObject = {hdc_rating: -1};
                break;
            }
    }
    //End Sorting

    //Filter
    var free_wifi;
    var pool;
    var free_parking;
    var pet_friendly;
    var free_breakfast;
    var star_rating = req.query.star_rating;
    var review_score = req.query.review_score;
    var price_low = req.query.price_low;
    var price_high = req.query.price_high;
    if (typeof star_rating == 'undefined' || star_rating == '')
        star_rating = 0
    if (typeof review_score == 'undefined' || review_score == '')
        review_score = 0
    if (typeof price_low == 'undefined' || price_low == '')
        price_low = 0
    if (typeof price_high == 'undefined' || price_high == '')
        price_high = Number.POSITIVE_INFINITY
    if (req.query.free_wifi == 1){
        free_wifi = new RegExp('free(.*)wifi',"ig");}
    else
        free_wifi = new RegExp(' ',"ig");
    if (req.query.pool == 1) 
        pool = new RegExp('pool',"ig");
    else
        pool = new RegExp(' ',"ig");
    if (req.query.free_parking == 1)
        free_parking = new RegExp('free(.*)parking',"ig");
    else
        free_parking = new RegExp(' ', "ig");
    if (req.query.pet_friendly == 1)
        pet_friendly = new RegExp('pet(.*)friendly',"ig");
    else
        pet_friendly = new RegExp(' ', "ig");
    if (req.query.free_breakfast == 1)
        free_breakfast = new RegExp('free(.*)breakfast',"ig");
    else
        free_breakfast = new RegExp(' ', "ig");
    //End Filter
    var searchKey = req.query.destinationName;
    var date = {
        checkin:req.query.checkIn.replace('"','').replace('"',''),
        checkout:req.query.checkOut.replace('"','').replace('"',''),
    };
    var numberRooms = parseInt(req.query.numberRooms);
    var startIndex = req.query.lastIndex;
    const NUM_RESULTS = req.query.numResults;
    const regex = new RegExp(searchKey,"ig");
    Hotel.find({
        amenities: { $all: [free_wifi, pool, free_parking, pet_friendly, free_breakfast]},
        $and:[{'price.singlePrice': {$gte: price_low}}, {'price.singlePrice': {$lte: price_high}}],
        star: {$gte: star_rating},
        hdc_rating: {$gte: review_score},
        $or:[{name:regex}, {city:regex},{airports:regex}]
    }).sort(sortByObject).then((doc,err)=>{
        if(err) res.status(400).json(err);
        var result = [];
        let bookingID = "bookid"
        while(result.length < NUM_RESULTS && doc[startIndex] !== undefined){
            var arr = doc[startIndex]
            let singleAvailable = checkAvailable(doc[startIndex].roomTypeAndNumber.single, date, numberRooms, bookingID);
            let doubleAvailable = checkAvailable(doc[startIndex].roomTypeAndNumber.double, date, numberRooms, bookingID);
            let kingAvailable = checkAvailable(doc[startIndex].roomTypeAndNumber.king, date, numberRooms, bookingID);
            let studioAvailable = checkAvailable(doc[startIndex].roomTypeAndNumber.studio, date, numberRooms, bookingID);
            if (singleAvailable || doubleAvailable || kingAvailable || studioAvailable){
                item = {
                    name:arr.name,
                    hotelID:arr._id,
                    address:arr.address,
                    city:arr.city,
                    price:arr.price.singlePrice,
                    star_rates:arr.star,
                    guest_rate:arr.hdc_rating,
                    img:arr.images[0],
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
        res.json({
            singleAvailability: singleRoomAvailability, 
            doubleAvailability: doubleRoomAvailability, 
            kingAvailability: kingRoomAvailablity, 
            studioAvailability: studioRoomAvailability, 
            name: hotel.name, 
            hotelID: hotel._id, 
            address: hotel.address, 
            city: hotel.city, 
            img: hotel.images, 
            price: hotel.price,
            star_rating: hotel.star, 
            ta_rating: hotel.ta_rating,
            hdc_rating: hotel.hdc_rating, 
            amenities: hotel.amenities, 
            airports: hotel.airports,
            review:hotel.reviews,
            top_spots:hotel.top_spots,
        })
    })
    .catch(err => res.status(404));

    })

module.exports = router;
