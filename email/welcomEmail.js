const nodemailer = require('nodemailer');
const moment = require('moment-timezone');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:"AbodeDevelopmentTeam@gmail.com",
    pass:"(P&7,EQzH^h4?#^R"
  }
});

module.exports = function welcomeEmail(booking){

            var checkin = booking.new_check_in_date ? booking.new_check_in_date : booking.check_in_date
            var diffDays = parseInt((checkin.getTime() - new Date(moment().tz("America/Los_Angeles").format()).getTime()) / (1000 * 60 * 60 * 24));
            if (
              diffDays <= 5 &&
              diffDays > 0 &&
              booking.welcome === false
            ) {
              var html = `<body>
            <div>
            <div class="topBar" style="background-image:linear-gradient(to right, #0c4b78, #3d4e96, #2c76a9);;overflow: hidden; height:100px;"> 
            <img src="cid:logo" alt="Smiley face" height="100" width="100" style="display: block;margin-left: auto;margin-right: auto;" />
            </div>
            <div style="  margin: auto;  width: 50%;  width:500px">
            <h1>${booking.hotelID.name} is Waiting for you</h1>
            <h4>Mr/Miss ${booking.customerID.Lastname}</h4>
            <p>Welcome to stay with ${booking.hotelID.name}</p>
            <p>We are expecting your arrival at ${checkin}</p>
            </div>
            </div>
            </body>`;
              var mailOptions = {
                from:
                  '"Abode Customer Service" <no-reply@abode.com>',
                to: `${booking.customerID.email}`,
                subject: `Welcome to ${booking.hotelID.name}`,
                attachments: [
                  {
                    filename: "logo.png",
                    path: __dirname + "/logo.png",
                    cid: "logo"
                  }
                ],
                html: `${html}`
              };
              transporter.sendMail(mailOptions, function(
                error,
                info
              ) {
                if (error) {
                  console.log(error);
                } else {
                  console.log(
                    "Email sent: " + JSON.stringify(info)
                  );
                }
              });
              booking.welcome = true;
              booking.save().catch(err => console.log(err));
            }
            if(diffDays === 0){
              booking.status = 1;
              booking.save().catch(err => console.log(err))
            }

}