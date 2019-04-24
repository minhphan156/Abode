const express = require("express");
const router = express.Router();
const passport = require("passport");

const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");
const Customer = require("../../models/customer");
const City = require("../../models/city")
const User = require("../../models/User");

const confirmEmail = require('../../email/confirmationEmail')


const checkAvailability = require('../../validation/checkAvailibility.js');
const checkAvalibity = require("../../validation/checkAvailableHotels");

// @route POST api/booking/review
// @desc Add a review and comment for a specific hotel
router.post("/review", (req,res) => {
    /*
    REQUEST SCHEMA

    {
        comment: String,
        starRating: int, // between 1 and 5 inclusive
        bookingID: String
    }
    */

    Booking.findByIdAndUpdate(req.body.bookingID, {review: req.body.comment, starReview: req.body.starRating}, (err, booking) =>  {
        if(err) return res.status(400).json(err);

        // Sending the new Booking object with review and starReview added
        return res.status(200).send(booking);
    })

});

// @route GET /api/booking/history
// @desc History page
// @access private
router.get("/history", passport.authenticate("jwt", { session: false }), (req, res) => {

    var historyPack = [];

            // Get the User being requested from the JWT token
            // Get all the Bookings that User has made
            Booking.find({customerID: req.user.customerID}, (err, bookings) => {
                if(err) return res.status(400).json(err);

                Customer.findById(req.user.customerID, (custErr, customerInfo) => {
                    if(custErr) return res.status(400).json(custErr);
                

                    // Get the Hotel info of each of their Bookings
                    bookings.map((element, i) => { 

                        Hotel.findById(element.hotelID, (err, hotelDoc) => {
                            if(err) return res.status(400).json(err)

                            // Add the hotel details and relevant booking details as a history object
                            historyPack.push(
                            {
                                name: customerInfo.Firstname + " " + customerInfo.Lastname,
                                price: hotelDoc.price[element.typeOfRoom + "Price"],
                                hotelName: hotelDoc.name,
                                img: hotelDoc.images[0],
                                city: hotelDoc.city,

                                bookingID: element._id,
                                check_in_date: element.check_in_date,
                                check_out_date: element.check_out_date,
                                typeOfRoom: element.typeOfRoom,
                                numOfRoom: element.numOfRoom,
                                numOfNights: element.numOfNights,
                                status: element.status,
                                changed: element.changed,
                                new_check_in_date: element.new_check_in_date,
                                new_check_out_date: element.new_check_out_date,

                                // Payment Info
                                subtotal: element.subtotal,
                                total: element.total,
                                discount: element.discount,
                                taxesAndFees: element.taxesAndFees,
                                rewardPointsUsed:element.rewardPointsUsed,
                                rewardPointsEarned:element.rewardPointsEarned,
                                rewardDiscount: element.rewardDiscount,
                                reservedDate:element.reservedDate,
                                nightlyRate: element.numOfNights,

                                // Info for Review
                                starReview: element.starReview,
                                comment: element.review
                            });

                            // Check if we've finished packing ALL the history objects
                            if (historyPack.length === bookings.length) {

                                historyPack.sort((a, b) => {
                                    if (b.new_check_in_date && a.new_check_in_date) {
                                        return (new Date(a.new_check_in_date)).getTime() - (new Date(b.new_check_in_date)).getTime()
                                    }

                                    else if (b.new_check_in_date && a.new_check_in_date === undefined) {
                                        return (new Date(a.new_check_in_date)).getTime() - (new Date(b.check_in_date)).getTime()
                                    }

                                    else if (b.new_check_in_date === undefined && a.new_check_in_date) {
                                        return (new Date(a.check_in_date)).getTime() - (new Date(b.new_check_in_date)).getTime()
                                    }

                                    return (new Date(a.check_in_date)).getTime() - (new Date(b.check_in_date)).getTime()
                                })

                                return res.status(200).send(historyPack);
                            }

                        });

                    }); // end map()
                
                }); // end Customer.findById

            }); // end Booking.find
        
});

// @route GET /api/booking/guest-history
// @desc History page
// @access public
router.get("/guest-history", (req, res) => {
    const bookingID = req.body.bookingID;
    const lastName = req.body.lastName;
    
    var historyPack = {};

    Booking.findById(bookingID, (err, book) => {
        if(err) return res.status(404).json(err);

        Customer.findById(book.customerID).then((custDoc) => {
            console.log("doc:", custDoc.Lastname)
            console.log("req",lastName)
            // Block request if the last name does not match the booking
            if(custDoc.Lastname !== lastName) return res.status(403).json({
                err: true
            })

            // User checking history has been authorized
            // Proceed with preparing history package
            historyPack.bookingID = book._id,
            historyPack.check_in_date = book.check_in_date;
            historyPack.check_out_date = book.check_out_date;
            historyPack.typeOfRoom = book.typeOfRoom;
            historyPack.numOfRoom = book.numOfRoom;
            historyPack.status = book.status;
            historyPack.changed = book.changed;
            historyPack.new_check_in_date = book.new_check_in_date;
            historyPack.new_check_out_date = book.new_check_out_date;
            historyPack.subtotal = book.subtotal;
            historyPack.discount = book.discount;
            historyPack.taxesAndFees = book.taxesAndFees;
            historyPack.numOfNights = book.numOfNights;
            
            // Info for Review
            historyPack.starReview = book.starReview;
            historyPack.comment = book.review;

            historyPack.err = false;

            Hotel.findById(book.hotelID).then(hotelDoc => {
                // Get the name, city and image of the hotel the User is staying at
                historyPack.hotelName = hotelDoc.name;
                historyPack.img = hotelDoc.images[0];
                historyPack.city = hotelDoc.city;

                // Give frontend the goods
                return res.status(200).send(historyPack);
            });

        }).catch((err) => {
            
            if(err) return res.status(404).json(err);

        });

    });

});

// @route POST /api/booking/confirm
// @desc Comfirmation page
// @access public
router.post("/confirm",(req,res)=>{
    passport.authenticate("jwt",function(err, user, info){
        // check if user is logged 
        var isLogged = false
        if(user){
            isLogged = true
        }
    var hotelID = req.body.hotelID;
    var roomType = req.body.roomType;
    var date = {
        checkin:req.body.checkIn.replace('"','').replace('"',''),
        checkout:req.body.checkOut.replace('"','').replace('"','')
        }
    var numberRooms = req.body.numberRooms;
    var firstname = req.body.Firstname;
    var lastname = req.body.Lastname;
    var email = req.body.email;
    var subtotal = req.body.subtotal;
    var discount = req.body.discount? req.body.discount: null ;
    var customerID;
    var bookingID = "tempBookingID"
    var rewardPointsUsed = req.body.rewardPointsUsed ? req.body.rewardPointsUsed : null;
    var rewardPointsEarned = req.body.rewardPointsEarned ? req.body.rewardPointsEarned : null;
    var rewardDiscount = req.body.rewardDiscount ? req.body.rewardDiscount : null;
    //check this user visit our website before and get customerID
    Customer.find({email:email},function(err,doc){
        if(err) res.status(400).json(err);

        if(doc.length === 0){
            const newCustomer = new Customer({
                Firstname:firstname,
                Lastname: lastname,
                email:email
            })
            newCustomer.save().then((doc,err)=>{
                if(err) res.status(400).json(err)
                customerID = doc._id;
                bookHotel()
            })
        }else{
            customerID = doc[0]._id;
            bookHotel()
        }
    })
    
    function bookHotel(){
        // find the hotel to book in db
        Hotel.find({_id:hotelID}).then((doc,err)=>{
            if(err) res.status(400).json(err)
            var newDoc = doc[0]
            var hotelName = doc[0].name
            var destinationName = doc[0].city
            var address = doc[0].address
            var hotelImg = doc[0].images[0]
            // check require room avaliablity
            if(roomType === 'single') {
                arr = doc[0].roomTypeAndNumber.single;
                roomPrice = doc[0].price.singlePrice;
            }
            else if(roomType === 'double'){
                arr = doc[0].roomTypeAndNumber.double;
                roomPrice = doc[0].price.doublePrice;
            } 
            else if(roomType === 'king'){
                arr = doc[0].roomTypeAndNumber.king;
                roomPrice = doc[0].price.kingPrice;
            } 
            else if(roomType === 'studio'){
                arr = doc[0].roomTypeAndNumber.studio;
                roomPrice = doc[0].price.suitePrice;
            } 

            // if the room is avaliable
            if(checkAvailability(arr,date,numberRooms,bookingID).length !==0){
                // check the customer made a resevation for the same checkin date
                Booking.find({$and:[{customerID:customerID},{$or:[{check_in_date:date.checkin},{new_check_in_date:date.checkin}]}]})
                .then((doc,err)=>{
                    if(err) res.status(400).json(err);
                    // if they dont, store the booking information into booking db
                    if(doc.length === 0){
                        if(isLogged){
                            if( rewardPointsUsed && user.rewardPoints < rewardPointsUsed){
                                res.status(403).send({error: "not enought rewardPoints"})
                                return
                            }
                            user.rewardPoints = user.rewardPoints - rewardPointsUsed
                            user.save()
                        }
                        const newBooking = new Booking({
                            customerID:customerID,
                            hotelID:hotelID,
                            check_in_date: date.checkin,
                            check_out_date: date.checkout,
                            typeOfRoom:roomType,
                            numOfRoom:numberRooms,
                            subtotal:subtotal,
                            total:req.body.total,
                            discount:discount,
                            rewardPointsUsed:rewardPointsUsed,
                            rewardPointsEarned:rewardPointsEarned,
                            taxesAndFees:req.body.taxesAndFees,
                            numOfNights:req.body.numberOfNights,
                            rewardDiscount:req.body.rewardDiscount,
                            nightlyRate: roomPrice
                        })
                        // reward points for logged user
                        // save new booking
                        newBooking.save().then((doc,err)=>{
                            if(err) res.status(400).json(err)
                            var rooms = []
                            arr.forEach(elements =>  elements.dates.forEach(item => {if(item.bookingID === bookingID){rooms.push(item)}}))
                            for(let i = 0; i < rooms.length; i++){
                                rooms[i].bookingID = doc._id
                            }
                            newDoc.bookingStats += 1;
                            newDoc.save().catch(err=>res.send(err))
                            // find the related city for hotel
                            var city = new RegExp(destinationName,'i')
                            City.find({name:city}).then(city=>{
                                if(city.length === 0) {
                                    destinationImg = null
                                }else{
                                    destinationImg = city[0].imgMain
                                }
                                confirmEmail(firstname,lastname,doc._id,hotelName,doc.typeOfRoom,date,email,doc.numOfRoom)
                                res.status(200).send({
                                    bookingID:doc._id,
                                    hotelName: hotelName,
                                    nightlyRate:roomPrice,
                                    hotelAddress:address,
                                    hotelImg:hotelImg,
                                    destinationName:destinationName,
                                    destinationImg:destinationImg,
                                    checkIn:doc.check_in_date,
                                    checkOut:doc.check_out_date,
                                    numRooms:doc.numOfRoom,
                                    roomType:doc.typeOfRoom,
                                    Firstname:firstname,
                                    Lastname:lastname,
                                    email:email,
                                    subtotal:subtotal,
                                    discounts:discount,
                                    rewardPointsUsed:rewardPointsUsed,
                                    rewardPointsEarned:rewardPointsEarned,
                                    rewardDiscount:rewardDiscount,
                                    reservedDate:doc.reservedDate,
                                    numberOfNights:req.body.numberOfNights,
                                    total:req.body.total,
                                    taxesAndFees:req.body.taxesAndFees,
                                    code:200
                                })
                            })
                        })
                    }
                    // if the customer already have one reservation for the same checkin date, return error message  
                    else{
                        res.send({message:"doubleBooking",
                                code:403})
                    }
                })
            }
            // if the type of room is not avaliable
            else{
                res.send({message:"noRoomAvailable",
                            code:409})
            }
        })
    }
      })(req, res)    
})


// @route POST /api/booking/changeReservation
// @desc change Reservation
// @access public
router.post('/changeReservation',(req,res)=>{
    passport.authenticate("jwt",function(err, user, info){
        var isLogged = false
        if(user){
            isLogged = true
        }
        bookingID = req.body.bookingID;
        date = {
            checkin:new Date(req.body.newCheckIn.replace('"','').replace('"','')),
            checkout:new Date(req.body.newCheckOut.replace('"','').replace('"',''))
        };
    
        Booking.findById(bookingID).then((reservations,err)=>{
            if(err) res.status(400).json(err);
            if(reservations){
                if(reservations.check_in_date.getTime() === date.checkin.getTime() && reservations.check_out_date.getTime() === date.checkout.getTime()){
                    res.status(409).json({message:"cannot change to same dates"})
                    return;
                }
                if(reservations.changed){
                if(reservations.new_check_in_date.getTime() === date.checkin.getTime() && reservations.new_check_out_date.getTime() === date.checkout.getTime()){
                    res.status(409).json({message:"cannot change to same dates"})
                    return;
                }}
                Hotel.findById(reservations.hotelID).then(hotel=>{
                    if(reservations.typeOfRoom === 'single'){
                        arr = hotel.roomTypeAndNumber.single;
                    }
                    if(reservations.typeOfRoom === 'double'){
                        arr = hotel.roomTypeAndNumber.double;
                    }
                    if(reservations.typeOfRoom === 'king'){
                        arr = hotel.roomTypeAndNumber.king;
                    }
                    if(reservations.typeOfRoom === 'studio'){
                        arr = hotel.roomTypeAndNumber.studio;
                    }
                    for(let i = 0;i<arr.length;i++){
                        for(let j = 0;j<arr[i].dates.length;j++){
                            if(arr[i].dates[j].bookingID === bookingID){
                                arr[i].dates.splice(j,1)
                            }
                        }
                    }
                    if(checkAvalibity(arr,date,reservations.numOfRoom,bookingID)){
                        if(isLogged){
                            reservations.rewardPointsEarned = req.body.newPointEarned?req.body.newPointEarned:reservations.rewardPointsEarned
                            if(req.body.newPointsused){
                                user.rewardPoints = user.rewardPoints + reservations.rewardPointsUsed - req.body.newPointsused
                                reservations.rewardPointsUsed = req.body.newPointsused?req.body.newPointEarned:reservations.rewardPointsUsed
                                
                            }
                        }
                        reservations.changed = true;
                        reservations.new_check_in_date = date.checkin;
                        reservations.new_check_out_date = date.checkout;
                        reservations.subtotal = req.body.newSubtotal?req.body.newSubtotal:reservations.subtotal
                        reservations.total = req.body.newTotal?req.body.newTotal:reservations.total
                        reservations.discount = req.body.newDiscount?req.body.newDiscount:reservations.discount
                        reservations.rewardDiscount = req.body.newRewardsDiscount?req.body.newRewardsDiscount:reservations.rewardDiscount
                        reservations.taxesAndFees = req.body.newTaxesAndFees?req.body.newTaxesAndFees:reservations.taxesAndFees
                        hotel.save().catch(err=>res.status(400).json(err));
                        reservations.save().catch(err=>res.status(400).json({
                            message:"Fail to change",
                            code: 400
                          }))
                          res.status(200).json(
                            {
                              message:"Successfully change",
                              code:200
                            })
                    }else{
                        res.status(409).json({
                            message:"no room available at that date",
                            code: 409
                          })
                    }
                }).catch(err=>{res.status(400).json(err)})
            }else{
                res.status(404).json({message:`cannot find ${bookingID}`,code:404})
            }
        })
    })(req,res)
})

// @route POST /api/booking/cancel
// @desc cancel a reservation 
// @access public
router.post('/cancel', (req,res)=>{
    Booking.findById(req.body.bookingID)
    .then(booking => {
        if (booking.status == 0){
            booking.status = 3;
            if (booking.rewardPointsUsed !== 0){
                User.findOneAndUpdate(
                    {'customerID': booking.customerID},
                    {$inc: { "rewardPoints" : booking.rewardPointsUsed }
                })
            }
            Hotel.findById(booking.hotelID)
            .then(hotel => {
                if(booking.typeOfRoom === 'single'){
                    arr = hotel.roomTypeAndNumber.single;
                }
                if(booking.typeOfRoom === 'double'){
                    arr = hotel.roomTypeAndNumber.double;
                }
                if(booking.typeOfRoom === 'king'){
                    arr = hotel.roomTypeAndNumber.king;
                }
                if(booking.typeOfRoom === 'studio'){
                    arr = hotel.roomTypeAndNumber.studio;
                }
                for(let i = 0;i<arr.length;i++){
                    for(let j = 0;j<arr[i].dates.length;j++){
                        if(arr[i].dates[j].bookingID === req.body.bookingID){
                            arr[i].dates.splice(j,1)
                        }
                    }
                }
                hotel.save().catch(err=>res.status(400).json(err));
                booking.save().catch( err => res.status(400).json({
                    message: "not able to cancel",
                    code: 400
                }))
                res.status(200).json({
                    message: "successfully canceled",
                    code: 200
                })
            })
        }
        else{
            res.status(400).json({
                message: "booking status is not 0.",
                code: 400
            })
        }
    })
})

module.exports = router;
