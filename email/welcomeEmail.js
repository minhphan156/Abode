const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const keys = require('../config/keys');
var weather = require('weather-js');
const cities = require('./cities.json')

  // email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: keys.email,
      pass: keys.password
    }
  });
module.exports = function welcomeEmail(booking){
  let arr = cities.name
  let des = null
  var city = new RegExp(booking.hotelID.city,'i')
  for(let i = 0; i < arr.length;i++){
    if(city.test(arr[i].label)){
      des = arr[i].label
    }
  }
  var checkin = booking.new_check_in_date
  ? booking.new_check_in_date
  : booking.check_in_date;
 var diffDays = parseInt(
  (checkin.getTime() -
    new Date(
      moment()
        .tz("America/Los_Angeles")
        .format()
    ).setHours(12,0,0,0)) /
    (1000 * 60 * 60 * 24)
) ;
checkin = moment(checkin)
  .tz("America/Los_Angeles")
  .format("MM/DD/YYYY");

if (diffDays <= 5 && diffDays > 0 && booking.welcome !== true) {
  console.log(diffDays)
  weather.find({search:des, degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
    let current = result[0].current;
    let forecast = result[0].forecast;
    console.log("abc" +diffDays)
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
            <p>Weather at Your destination ${des} today is:
              <br>${current.date}, ${current.day}, ${current.skytext}, ${
        current.temperature
      }°F </br>
            </p>
            <p>Weather for future 5 days would be
            <br>    ${forecast[0].date}, ${forecast[0].day}, ${
        forecast[0].skytextday
      }, low Temp: ${forecast[0].low}°F, High Temp: ${
        forecast[0].high
      }°F</br>
            <br>    ${forecast[1].date}, ${forecast[1].day}, ${
        forecast[1].skytextday
      }, low Temp: ${forecast[1].low}°F, High Temp: ${
        forecast[1].high
      }°F</br>
            <br>    ${forecast[0].date}, ${forecast[2].day}, ${
        forecast[2].skytextday
      }, low Temp: ${forecast[2].low}°F, High Temp: ${
        forecast[2].high
      }°F</br>
            <br>    ${forecast[0].date}, ${forecast[3].day}, ${
        forecast[3].skytextday
      }, low Temp: ${forecast[3].low}°F, High Temp: ${
        forecast[3].high
      }°F</br>
            <br>    ${forecast[0].date}, ${forecast[4].day}, ${
        forecast[4].skytextday
      }, low Temp: ${forecast[4].low}°F, High Temp: ${
        forecast[4].high
      }°F</br>
            </div>
            </div>
            </body>`;
      var mailOptions = {
        from: '"Abode Customer Service" <no-reply@abode.com>',
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
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + JSON.stringify(info));
        }
      });
      booking.welcome = true;
      booking.save().catch(err => console.log(err));
  });
}
if (diffDays === 0) {
  booking.status = 1;
  booking.save().catch(err => console.log(err));
}
}