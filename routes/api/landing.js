const express = require("express");
const router = express.Router();

const City = require("../../models/city");

router.get("/", function (req, res) {
  City.find({}, function (err, doc) {
    if (err) res.status(400).json(err);
    var destinations = [];
    var i;
    //change loop limit if want more featured cities
    var index = Math.floor(Math.random() * doc.length)
    console.log(doc[index])
    var headImg = doc[index].imgMain
    var headCityName = doc[index].name
    for (i = 0; i < 5; i++) {
      let a = Math.floor(Math.random() * doc.length);

      destinations.push({cityName:doc[a].name,
                            picurl:doc[a].imgMain});
    }
    const result = {
      header: {
        cityName: headCityName,
        headImg: headImg
      },
      featureDestination: destinations
    }
    //console.log(result)
    res.send(result);
     
      /* **If repeating cities is concern, use shuffle **
      doc = shuffle(doc);
      for(i = 0; i < 5; i++){
          destinations.push(doc.pop());
      }
      res.send(destinations);
      */
    })
    

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
