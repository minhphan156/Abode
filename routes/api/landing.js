const express = require("express");
const router = express.Router();

const City = require("../../models/city");

router.get("/", function(req, res) {
  City.find({}, function(err, doc) {
    if (err) res.status(400).json(err);

    var landingInfo = {
      inspire: "",
      inspireCity: "",
      featCities: []
    };
    var i;
    doc.sort((a, b) => b.bookings - a.bookings);
    let n = Math.floor(Math.random() * doc.length);
    landingInfo.inspire = doc[n].inspire;
    landingInfo.inspireCity = doc[n].name;

    //change loop limit if want more featured cities
    for (i = 0; i < 4; i++) {
      landingInfo.featCities.push(doc[i]);
    }

    res.send(landingInfo);

    /* **If repeating cities is concern, use shuffle **
      doc = shuffle(doc);
      for(i = 0; i < 5; i++){
          destinations.push(doc.pop());
      }
      res.send(destinations);
      */
  });

  //fisher yates shuffle of cities
  function shuffle(arr) {
    var curIndex = arr.length;
    var ranIndex;
    var tempValue;

    while (curIndex !== 0) {
      ranIndex = Math.floor(Math.random() * curIndex);
      curIndex -= 1;

      tempValue = arr[curIndex];
      arr[curIndex] = arr[ranIndex];
      arr[ranIndex] = tempValue;
    }

    return arr;
  }
});

module.exports = router;
