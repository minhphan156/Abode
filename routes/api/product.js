// deal with authentication here
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Product model
const Product = require("../../models/Product");

// @route GET api/product/search
// @desc Get array of products based on search query
// @access Public
// router.get("/search/:description", (req, res) => {
router.get("/search/", (req, res) => {
  // 3-receive req to query from submitQuery at /actions/queryActions.js
  //NOTE:
  // search/?string <-we use-> req.query
  // search/:string <-we use-> req.params
  const regex = new RegExp(req.query.name, "i"); // find part of string which include lower and upper case

  // find return [ ]
  Product.find({ name: regex })
    .then(product => {
      if (!product) {
        // if product not found
        errors = { query: "product not found" };
        return res.status(404).json(errors);
      }
      res.send(product);
    })
    .catch(err => {
      console.error(err);
    });
});

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
      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// export so server.js can use this
module.exports = router;
