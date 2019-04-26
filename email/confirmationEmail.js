const nodemailer = require("nodemailer");
const keys = require('../config/keys');
const moment = require('moment-timezone');

module.exports = function confirmEmail(firstname,lastname,id,hotelName,typeOfRoom,date,email,numOfRoom) {
  // email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: keys.email,
      pass: keys.password
    }
  });
  var checkin = moment(date.checkin).tz("America/Los_Angeles").format("MM/DD/YYYY")
  var html = `<body>
  <div>
  <div class="topBar" style="background-image:linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9);;overflow: hidden; height:100px;"> 
  <img src="cid:logo" alt="Smiley face" height="100" width="100" style="display: block;margin-left: auto;margin-right: auto;" />
  </div>
  <div style="margin: auto;  width: 50%;  width:500px">
  <h1>Your Reservation is Confirmed</h1>
  <h4>Dear ${firstname} ${lastname}</h4>
  <p>Thank you for booking at Abode</p>
  <p>You Reservation ID is ${id}</p>
  <p>You reservation was made in ${hotelName} with ${numOfRoom} ${typeOfRoom} room(s)</p>
  <p>We are expecting your arrival at ${checkin}</p>
  <p>You can view your booking detail in <a href="www.abode.city/history-search">www.abode.city/history-search </a></p>
  </div>
  </div>
  </body>`
  var mailOptions = {
    from: '"Abode Customer Service" <no-reply@abode.com>',
    to: `${email}`,
    subject: "[Order Confirmation]Your Revservation is confirmed",
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/logo.png",
        cid: "logo"
      }
    ],
    html: `${html}`
  };
  console.log("here");
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + JSON.stringify(info));
    }
  });
};