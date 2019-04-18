const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "AbodeDevelopmentTeam@gmail.com",
    pass: "(P&7,EQzH^h4?#^R"
  }
});

module.exports = function confirmEmail(firstname,lastname,id,hotelName,typeOfRoom,date,email) {
  // email
  console.log("abcd")
  var html = "<div>here is your orders</div>";
  html += `<div>Hello ${firstname} ${lastname}<div>`;
  html += `<div>Thank you for booking at Abode<div>`;
  html += `<div>You booking ID is ${id}<div>`;
  html += `<div>You reservation was made in ${hotelName} with ${numberRooms} ${typeOfRoom} room(s)<div>`;
  html += `<div>Please Check in at ${date.checkin}<div>`;
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
      console.log("Email sent: " + info.response);
    }
  });
};