const express = require("express");
const router = express.Router();

const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");
const Customer = require("../../models/customer");

const checkAvalibility = require("../../validation/checkAvalibility");

// @route POST /api/booking/confirm
// @desc Comfirmation page
// @access public
router.post("/confirm",(req,res)=>{
    var hotelID = req.body.hotelID;
    var roomType = req.body.roomType;
    var date = {
        checkin:req.body.checkIn,
        checkout:req.body.checkOut
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
            // check require room avaliablity 
            if(roomType === 'single') arr = doc[0].roomTypeAndNumber.single;
            else if(roomType === 'double') arr = doc[0].roomTypeAndNumber.double;
            else if(roomType === 'king') arr = doc[0].roomTypeAndNumber.king;
            else if(roomType === 'studio') arr = doc[0].roomTypeAndNumber.single;

            // if the room is avaliable
            if(checkAvalibility(arr,date,numberRooms,bookingID).length !==0){
                // check the customer made a resevation for the same checkin date
                Booking.find({$and:[{customerID:customerID},{check_in_date:date.checkin}]})
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
                            res.status(200).send({bookingID:doc._id})
                        })
                    }
                    // if the customer already have one reservation for the same checkin date, return error message  
                    else{
                        res.status(409).send({error1:"You are not allow to make multilple reservation for same check in date"})
                    }
                })
            }
            // if the type of room is not avaliable
            else{
                res.status(409).send({error2:"No rooms avaliable for this hotel in our website anymore"})
            }
        })
    }
})



module.exports = router;