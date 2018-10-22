// deal with authentication here
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Product model
const Product = require("../../models/Product");

// @route GET api/product/search
// @desc Register user
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
// @route GET api/product/test
// @desc Tests profile route
// @access Public
// this will append to home route 'localHost:5000/api/profile/test'
// res.json will return json object
router.get("/test", (req, res) =>
  res.json({
    msg: "Product Works"
  })
);

// @route GET api/product/item
// @desc Retrieves specific item details for an item name
// @access Public
// For example, localhost:5000/api/product/item?name=Fuji Apple
// will have res.json return the JSON object of the Fuji Apple product
router.get("/item", (req, res) => {
  const errors = {};
  console.log(req.query.name); // Remove later
  Product.findOne({ name: req.query.name })
    .then(product => {
      if (!product) {
        errors.noproduct = "There is no product for this name";
        return res.status(404).json(errors);
      }
      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/product/:productname
// @desc    Get product by name
// @access  Public

router.get("/:productname", (req, res) => {
  const errors = {};
  console.log(req.params.productname);
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