// deal with authentication here
const express = require("express");
const router = express.Router();

// Load Product model
const Product = require("../../models/Product");

// @route GET api/product/search
// @desc Register user
// @access Public
// receive req to query from submitQuery at /actions/queryActions.js
//NOTE:
// search/?string <-we use-> req.query
// search/:string <-we use-> req.params
router.get("/search/", (req, res) => {
  // find part of string which include lower and upper case
  const regex = new RegExp(req.query.name, "i");

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

// @route GET api/product/category
// @desc Register user
// @access Public
router.get("/category/", (req, res) => {
  // receive req to query from submitcategory at /actions/categoryActions.js
  //NOTE:
  // category/?string <-we use-> req.query
  // category/:string <-we use-> req.params
  const newQuery = new RegExp(req.query.category, "i"); // find part of string which include lower and upper case

  // find return [ ]
  Product.find({ category: newQuery })
    .then(product => {
      if (!product) {
        // if product not found
        errors = { category: "product not found" };
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
      Product.find({category: product.category})
      .nin('_id',product._id)
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
