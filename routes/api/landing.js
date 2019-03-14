const express = require("express");
const router = express.Router();

const City = require("../../models/city");

router.get("/", function(req, res) {
  City.find({}, function(err, doc){
      if(err) res.status(400).json(err);
      var destinations = [];
      var i;
      //change loop limit if want more featured cities
      for(i = 0; i < 5; i++){
          let a = Math.floor(Math.random() * doc.length);
          destinations.push(doc[a]);
      }
      res.send(destinations);
     
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
