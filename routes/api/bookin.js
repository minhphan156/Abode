const express = require("express");
const router = express.Router();
const passport = require("passport");

const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");
const Customer = require("../../models/customer");
const City = require("../../models/city")
const User = require("../../models/User");

const checkAvailability = require('../../validation/checkAvailibility.js');
const checkAvalibity = require("../../validation/checkAvailableHotels");

// @route GET /api/booking/history
// @desc History page
// @access private
router.get("/history", passport.authenticate("jwt", { session: false }), (req, res) => {

    var historyPack = [];

            // Get the User being requested from the JWT token
            // Get all the Bookings that User has made
            Booking.find({customerID: req.user.customerID}, (err, bookings) => {
                if(err) return res.status(400).json(err);

                    // Get the Hotel info of each of their Bookings
                    bookings.map((element, i) => { 

                        Hotel.findById(element.hotelID, (err, hotelDoc) => {
                            if(err) return res.status(400).json(err)

                            // Add the hotel details and relevant booking details as a history object
                            historyPack.push(
                            {
                                bookingID: element._id,
                                hotelName: hotelDoc.name,
                                img: hotelDoc.images[0],
                                city: hotelDoc.city,
                                check_in_date: element.check_in_date,
                                check_out_date: element.check_out_date,
                                typeOfRoom: element.typeOfRoom,
                                numOfRoom: element.numOfRoom,
                                status: element.status,
                                changed: element.changed,
                                new_check_in_date: element.new_check_in_date,
                                new_check_out_date: element.new_check_out_date,
                                subtotal: element.subtotal,
                                total: element.total,
                                discount: element.discount,
                                rewardPointsUsed:element.rewardPointsUsed,
                                rewardPointsEarned:element.rewardPointsEarned,
                                reservedDate:element.reservedDate
                            });

                            // Check if we've finished packing all the history objects
                            if (i === (bookings.length - 1)) return res.status(200).send(historyPack);

                        });

                    }); // end map()

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
    var discount = req.body.discount;
    var customerID;
    var bookingID = "tempBookingID"

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
            if(roomType === 'single') arr = doc[0].roomTypeAndNumber.single;
            else if(roomType === 'double') arr = doc[0].roomTypeAndNumber.double;
            else if(roomType === 'king') arr = doc[0].roomTypeAndNumber.king;
            else if(roomType === 'studio') arr = doc[0].roomTypeAndNumber.studio;

            // if the room is avaliable
            if(checkAvailability(arr,date,numberRooms,bookingID).length !==0){
                // check the customer made a resevation for the same checkin date
                Booking.find({$and:[{customerID:customerID},{$or:[{check_in_date:date.checkin},{new_check_in_date:date.checkin}]}]})
                .then((doc,err)=>{
                    if(err) res.status(400).json(err);
                    // if they dont, store the booking information into booking db
                    if(doc.length === 0){
                        const newBooking = new Booking({
                            customerID:customerID,
                            hotelID:hotelID,
                            check_in_date: date.checkin,
                            check_out_date: date.checkout,
                            typeOfRoom:roomType,
                            numOfRoom:numberRooms,
                            subtotal:subtotal,
                            discount:discount,
                        })
                        
                        newBooking.save().then((doc,err)=>{
                            if(err) res.status(400).json(err)
                            var rooms = []
                            arr.forEach(elements =>  elements.dates.forEach(item => {if(item.bookingID === bookingID){rooms.push(item)}}))
                            for(let i = 0; i < rooms.length; i++){
                                rooms[i].bookingID = doc._id
                            }
                            newDoc.bookingStats += 1;
                            newDoc.save().catch(err=>res.send(err))
                            var city = new RegExp(destinationName,'i')
                            City.find({name:city}).then(city=>{
                                if(city.length === 0) {
                                    destinationImg = null
                                }else{
                                    destinationImg = city[0].imgMain
                                }
                                res.status(200).send({
                                    bookingID:doc._id,
                                    hotelName: hotelName,
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
                                    rewardPointsUsed:doc.rewardPointsUsed,
                                    rewardPointsEarned:doc.rewardPointsEarned,
                                    reservedDate:doc.reservedDate
                                })
                            }).catch(err=>res.send({message:"cannot find city",code:404}))
                        })
                    }
                    // if the customer already have one reservation for the same checkin date, return error message  
                    else{
                        res.send({message:"doubleBooking",
                                                code:409})
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
})


// @route POST /api/booking/changeReservation
// @desc change Reservation
// @access public
router.post('/changeReservation',(req,res)=>{
    bookingID = req.query.bookingID;
    date = {
        checkin:new Date(req.query.newCheckIn.replace('"','').replace('"','')),
        checkout:new Date(req.query.newCheckOut.replace('"','').replace('"',''))
    };
    newPrice = req.query.newPrice ? req.query.newPrice : null;
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
                    reservations.changed = true;
                    reservations.new_check_in_date = date.checkin;
                    reservations.new_check_out_date = date.checkout;
                    if(newPrice){
                        reservations.new_price = newPrice
                    }
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
})

// @route POST /api/booking/cancel
// @desc cancel a reservation 
// @access public
router.post('/cancel', (req,res)=>{
    Booking.findById(req.query.bookingID)
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
                        if(arr[i].dates[j].bookingID === req.query.bookingID){
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