const express = require("express");
const router = express.Router();

const checkAvalibity = require("../../validation/checkAvalibility.js");
const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");

// just example for how to start
// everything in this 
// write coments for you api call like /api/hotel/*
// like below is /api/hotel/searchdo
// router.get('/searchdo',(req,res)=>{
//     console.log("hotle.js")
// })
// router.post('/something',(res,req)=>{
// })

// @route GET api/hotel/search
// @desc Search Overview
router.get('/search',(req,res)=>{
    var searchKey = req.body.destinationName;
    var date = {
        checkin:req.body.checkIn,
        checkout:req.body.checkOut
    };
    var numberRooms = req.body.numberRooms;
    var pageNumber = req.body.page
    const regex = new RegExp(searchKey,"ig");
    //.split("").join('*')
    console.log(regex)
    Hotel.find({$or:[{name:regex}, {city:regex},{airports:regex}]}).then((doc,err)=>{
        if(err) res.status(400).json(err);
        var startIndex = 5 * pageNumber - 5;
        var result = [];
        let bookingID = "bookid"
        while(result.length < 5 && doc[startIndex] !== undefined){
            var arr = doc[startIndex]
            let singleAvaliable = checkAvalibity(doc[startIndex].roomTypeAndNumber.single, date, numberRooms, bookingID);
            let doubleAvaliable = checkAvalibity(doc[startIndex].roomTypeAndNumber.double, date, numberRooms, bookingID);
            let kingAvaliable = checkAvalibity(doc[startIndex].roomTypeAndNumber.king, date, numberRooms, bookingID);
            let studioAvaliable = checkAvalibity(doc[startIndex].roomTypeAndNumber.studio, date, numberRooms, bookingID);
            if(singleAvaliable.length !== 0 || doubleAvaliable.length !== 0 || kingAvaliable.length !== 0 || studioAvaliable.length !== 0){
                item = {
                    name:arr.name,
                    hotelID:arr._id,
                    street:arr.street,
                    city:arr.city,
                    price:arr.price.single,
                    star_rates:arr.star_rating,
                    guest_rate:arr.guest_rating,
                    img:arr.img[0]
                }
                result.push(item);
                startIndex++;
            }
        }
        res.status(200).json(result);

    })

})

module.exports = router;