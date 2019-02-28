const express = require("express");
const router = express.Router();

const checkAvalibity = require("../../validation/checkAvalibility.js");
const Hotel = require("../../models/Hotel");
const Booking = require("../../models/booking");


router.get('/',(req,res)=>{
    console.log("hotle.js")
})



module.exports = router;