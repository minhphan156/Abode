const express = require("express");
const router = express.Router();

const City = require("../../models/city");

router.get("/city/:id", function(req, res) {
  City.findById(req.params.id).then(doc => {
    if (!doc) {
      return res.status(404).end();
    }
    return res.status(200).json(doc);
  });
});

module.exports = router;
