const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const User = require('../models/User')
const keys = require('../config/keys');

  // email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: keys.email,
      pass: keys.password
    }
  });


module.exports = function checkout(booking){

    var checkout = booking.new_check_out_date ? booking.new_check_out_date :booking.check_out_date
    var diffDays = parseInt((checkout.getTime() - new Date(moment().tz("America/Los_Angeles").format()).setHours(12,0,0,0)) / (1000 * 60 * 60 * 24)) + 1;
    if(diffDays === 0){
        booking.status = 2
        var html = `<body>
        <div>
        <div class="topBar" style="background-image:linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9);;overflow: hidden; height:100px;"> 
        <img src="cid:logo" alt="Smiley face" height="100" width="100" style="display: block;margin-left: auto;margin-right: auto;" />
        </div>
        <div style="  margin: auto;  width: 50%;  width:500px">
        <h1>Thank you for staying at${booking.hotelID.name}</h1>
        <h4>Mr/Miss ${booking.customerID.Lastname}</h4>
        <p>We wish you have a great night(s) in ${booking.hotelID.name}</p>`
        if(booking.rewardPointsEarned){
          html += `<p>${booking.rewardPointsEarned} points have added to your account</p>`;
          }
        html += `<p>We are expecting to see you again</p>
        </div>
        </div>
        </body>`;


        var mailOptions = {
            from: '"Abode Customer Service" <no-reply@abode.com>',
            to: `${booking.customerID.email}`,
            subject: `Thank You for Staying at ${booking.hotelID.name}`,
            attachments: [
              {
                filename: "logo.png",
                path: __dirname + "/logo.png",
                cid: "logo"
              }
            ],
            html: `${html}`
          };
            html: `${html}`
          };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + JSON.stringify(info));
            }
          });
          booking.save().then(booking =>{
              if(booking.rewardPointsEarned){
                User.findOneAndUpdate(
                    {"customerID":booking.customerID},
                    {$inc:{"rewardPoints": parseInt(booking.rewardPointsEarned)}},
                    {new: true }).then(doc=>{
                        console.log(doc)
                    }).catch(err=>console.log(err))
              }
          }).catch(err=>console.log(err))
    }
