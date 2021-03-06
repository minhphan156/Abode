const express = require("express");
const router = express.Router();
const NodeGeocoder = require('node-geocoder');
const moment = require('moment-timezone');

const checkAvailable = require("../../validation/checkAvailableHotels");
var checkAvailability = require('../../validation/checkAvailibility.js')
const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");
const Customer = require("../../models/customer");

var options = {
    provider: 'google',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyBjtRUvjcEnZpsmS4xtRF1f5HZ1RRV8qWI', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

  var geocoder = NodeGeocoder(options);

// @route GET api/hotel/search
// @desc Search Overview with Sorting and Filtering
router.get('/search', (req,res)=>{
    //Sorting
    var sortByObject = req.query.sortObject;
    if (typeof sortByObject !== 'undefined'){
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
    var free_wifi = new RegExp(' ', "ig");
    var pool = new RegExp(' ', "ig");
    var free_parking = new RegExp(' ', "ig");
    var multilingual = new RegExp(' ', "ig");
    var free_breakfast = new RegExp(' ', "ig");
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

    if (req.query.free_wifi === "1") {
    free_wifi = new RegExp("wifi", "ig");
    }

    if (req.query.pool === "1") pool = new RegExp("pool", "ig");

    if (req.query.free_parking === "1")
    free_parking = new RegExp("valet(.*)parking", "ig");
    if (req.query.multilingual === "1")
    multilingual = new RegExp("multilingual", "ig");

    if (req.query.free_breakfast === "1")
    free_breakfast = new RegExp("breakfast", "ig");

    //End Filter
    var searchKey = req.query.destinationName;
    var date = {
        checkin:req.query.checkIn.replace('"','').replace('"',''),
        checkout:req.query.checkOut.replace('"','').replace('"',''),
    };
    let holiday = false
    //holiday
    let objDate = new Date(moment("2019-07-04").tz("America/Los_Angeles")).getTime()
    let comingDate = new Date(moment(date.checkin).tz("America/Los_Angeles")).getTime()
    let checkInDiff = parseInt((comingDate - objDate)/(1000 * 60 * 60 * 24)) 
    objDate = new Date(moment("2019-07-05").tz("America/Los_Angeles")).getTime()
    comingDate = new Date(moment(date.checkout).tz("America/Los_Angeles")).getTime()
    let checkOutDiff = parseInt((comingDate - objDate)/(1000 * 60 * 60 * 24)) 
    if(checkInDiff === 0 &&  checkOutDiff === 0){
        holiday = true;
    }
    //

    var numberRooms = parseInt(req.query.numberRooms);
    var startIndex = req.query.lastIndex;
    const NUM_RESULTS = req.query.numResults;
    const regex = new RegExp(searchKey,"ig");
    Hotel.find({
        amenities: { $all: [free_wifi, pool, free_parking, multilingual, free_breakfast]},
        $and:[{'price.singlePrice': {$gte: price_low}}, {'price.singlePrice': {$lte: price_high}}],
        star: {$gte: star_rating},
        hdc_rating: {$gte: review_score},
        $or:[{name:regex}, {city:regex},{airports:regex}]
    }).sort(sortByObject).then(async (doc,err)=>{
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
                    discount:holiday ? 0.85: arr.discount,
                    star_rates:arr.star,
                    guest_rate:arr.hdc_rating,
                    img:arr.images[0],
                }
                result.push(item);
            }
            startIndex++;
        }

        let addresses = result.map(elem => {return elem.address})
       await geocoder.batchGeocode(addresses, function (err, results) {
            result.map((elem,i)=>{
                elem.lat = results[i].value[0].latitude;
                elem.lng = results[i].value[0].longitude;   
            })
          });

        resultPack = {
            "lastIndex": startIndex,
            "pageNumber": req.query.pageNumber,
            "nextExists": (doc[startIndex] !== undefined) ? true : false,
            "results": result
        }
        res.status(200).json(resultPack);

    })
})


// @route GET api/hotel/individual
// @desc individual page
router.get('/individual', async (req,res) => {
    var date = {
        checkin: req.query.checkIn.replace('"','').replace('"',''),
        checkout: req.query.checkOut.replace('"','').replace('"','')
    };
    let holiday = false
    //holiday
    let objDate = new Date(moment("2019-07-04").tz("America/Los_Angeles")).getTime()
    let comingDate = new Date(moment(date.checkin).tz("America/Los_Angeles")).getTime()
    let checkInDiff = parseInt((comingDate - objDate)/(1000 * 60 * 60 * 24)) 
    objDate = new Date(moment("2019-07-05").tz("America/Los_Angeles")).getTime()
    comingDate = new Date(moment(date.checkout).tz("America/Los_Angeles")).getTime()
    let checkOutDiff = parseInt((comingDate - objDate)/(1000 * 60 * 60 * 24)) 
    if(checkInDiff === 0 &&  checkOutDiff === 0){
        holiday = true;
    }
    //
    var numberOfRooms = parseInt(req.query.numberRooms);
    let singleRoomAvailability = true;
    let doubleRoomAvailability = true;
    let kingRoomAvailablity = true;
    let studioRoomAvailability = true;
    let reviewPack = false

    Hotel.findById(req.query.id).then( hotel => {

        // Grab all the Booking objects for this hotel
        Booking.find({hotelID: req.query.id}).then(function grabBookings (allBookings) {

            // Get all the reviews from these hotel bookings
            async function getReviews() {
            
                filteredBookings = await allBookings
                    
                // Drop all the Bookings that do NOT have a review
                .filter((elem) => {
                    if (elem.starReview < 1) return false;
                    return true;
                })

                // Grab only the information we need (Name, Review Text, Rating, Date)
                reviewPack = Promise.all(filteredBookings.map(async (elem) => {

                    // Get the full name of the customer for this Booking
                    let cust = await Customer.findById(elem.customerID)
                                    .catch( error => { return res.status(404).json({ 
                                        err: `Couldn't find a customer for ${elem.customerID}`,
                                        message: error
                                        }) 
                                    });
                    
                    // Set the correct date for this review
                    if (elem.new_check_out_date) {
                        date = elem.new_check_out_date
                    }
                    else {
                        date = elem.check_out_date
                    }

                    // Prepare the single review item to be added to review array
                    let reviewItem = {
                        reviewStar: elem.starReview,
                        reviewText: elem.review,
                        reviewDate: date,
                        // Take a first/last name like Vinny Senthil and set name to Vinny S.
                        reviewName: `${cust.Firstname} ${cust.Lastname.charAt(0).toUpperCase()}.`
                    }

                    return reviewItem

                })); // end map()

            } // end getReviews()
            
            // Once we have all the reviews for a hotel
            getReviews().then(async () => {

            if ((typeof date.checkin !== 'undefined') && (typeof date.checkout !== 'undefined')){
                if(checkAvailability(hotel.roomTypeAndNumber.single, date, numberOfRooms, "PlaceHolder").length == 0)
                    singleRoomAvailability = false;
                if(checkAvailability(hotel.roomTypeAndNumber.double, date, numberOfRooms, "PlaceHolder").length == 0)
                    doubleRoomAvailability = false;
                if(checkAvailability(hotel.roomTypeAndNumber.king, date, numberOfRooms, "PlaceHolder").length == 0)
                    kingRoomAvailablity = false;
                if(checkAvailability(hotel.roomTypeAndNumber.studio, date, numberOfRooms, "PlaceHolder").length == 0 || hotel.star <= 3)
                    studioRoomAvailability = false;
            }

            geocoder.geocode(hotel.address).then(async req=>{
                individualHotelPack = {
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
                    // lat and lng
                    lat:req[0].latitude,
                    alt: req[0].longitude,
                    // Add the complete reviews for this hotel and sort by most recent review
                    review: (await (reviewPack)).sort((a,b) => { return (new Date(b.reviewDate)).getTime() - (new Date(a.reviewDate)).getTime() }),
                    top_spots:hotel.top_spots,
                    discount:holiday? 0.85: hotel.discount,
                }
                
                // Send final package of info about this hotel
                return res.status(200).json(individualHotelPack);    
            })
                    
            });

            getReviews().catch((reviewErr) => {
                return res.status(404).json({ 
                    err: `Couldn't find a review`,
                    message: reviewErr
                }); 
            });

        }).catch((err) => { return res.status(404).json({ err: `Couldn't find any bookings for hotel ${ req.query.id }` }) });

    }).catch(err => { return res.status(404).json({ err: `Couldn't find a hotel for ${ req.query.id }` })});
    
}); // end GET api/hotels/individual

module.exports = router;