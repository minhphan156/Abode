// deal with authentication here
const express = require("express");
const router = express.Router();

// Load Cart model
const Cart = require("../../models/Cart");

// @route POST api/cart/create
// @desc create cart
// @access Public

router.post("/create", (req, res) => {
  console.log("===cart.js back end : " + JSON.stringify(req.body));
  //req.body = cartData from createCart() in cartActions.js
  new Cart(req.body)
    .save()
    .then(cart => res.json(cart))
    .catch(err => console.log(err));
});

// export so server.js can use this
module.exports = router;
