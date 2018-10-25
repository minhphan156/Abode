// deal with authentication here
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Product model
const Product = require("../../models/Product");

// @route   GET api/product/:productname
// @desc    Get product by name
// @access  Public
router.get("/:productname", (req, res) => {
  const errors = {};
  Product.findOne({ name: req.params.productname })
    .then(product => {
      if (!product) {
        errors.noproduct = "There is no product for this name";
        return res.status(404).json(errors);
      }
      Product.find({category: product.category})
      
      .limit(3)
      .then(related => {
        product.relatedarray = related;
        res.json(product);
      });
    })
    .catch(err => res.status(404).json(err));
});

// export so server.js can use this
module.exports = router;
