const express = require("express");
const router = express.Router();

const City = require("../../models/city");

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get("/city/:id", (req, res) => {
  City.findById(req.params.id).then(doc => {
    if (!doc) {
      return res.status(404).end();
    }
    return res.status(200).json(doc);
  });
}); 

module.exports = router;
