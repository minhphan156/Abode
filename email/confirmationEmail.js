const nodemailer = require("nodemailer");
const keys = require('../config/keys')

module.exports = function confirmEmail(firstname,lastname,id,hotelName,typeOfRoom,date,email,numOfRoom) {
  // email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: keys.email,
      pass: keys.password
    }
  });

  console.log(firstname)
  console.log(hotelName)
  console.log(lastname)
  console.log(id)
  console.log(typeOfRoom)
  console.log(date)
  console.log(email)
  var html = "<div></div>";
  html += `<div>Dear ${firstname} ${lastname}</div>`;
  html += `<div>Thank you for booking at Abode</div>`;
  html += `<div>You booking ID is ${id}</div>`;
  html += `<div>You reservation was made in ${hotelName} with ${numOfRoom} ${typeOfRoom} room(s)</div>`;
  html += `<div>Please Check in before ${date.checkin}</div>`;
  html += `<div>You can view your booking detail in www.abode.city/history-search </div>`
  var mailOptions = {
    from: '"Abode Customer Service" <no-reply@abode.com>',
    to: `${email}`,
    subject: "[Order Confirmation]Your Revservation is confirmed",
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