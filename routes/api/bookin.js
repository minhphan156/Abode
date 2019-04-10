const express = require("express");
const router = express.Router();
const passport = require("passport");

const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");
const Customer = require("../../models/customer");
const City = require("../../models/city")


const checkAvailability = require('../../validation/checkAvailibility.js');
const checkAvalibity = require("../../validation/checkAvailableHotels");

// @route POST /api/booking/confirm
// @desc Comfirmation page
// @access public
router.post("/confirm",(req,res)=>{
    passport.authenticate("jwt",function(err, user, info){
        // check if user is logged 
        var isLogged = false
        if(user){
            console.log(user)
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
    var discount = req.body.discount;
    var customerID;
    var bookingID = "tempBookingID"
    var rewardPointsUsed = req.body.rewardPointsUsed ? req.body.rewardPointsUsed : null;
    var rewardPointsEarned = null;
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
                            rewardPointsEarned = subtotal * 1000;
                            if( rewardPointsUsed && user.rewardPoints < rewardPointsUsed){
                                res.status(403).send({error: "not enought rewardPoints"})
                                return
                            }
                            user.rewardPoints = user.rewardPoints + rewardPointsEarned - rewardPointsUsed
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
                            discount:discount,
                            rewardPointsUsed:rewardPointsUsed,
                            rewardPointsEarned:rewardPointsEarned,
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

      })(req, res)


    
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

module.exports = router;