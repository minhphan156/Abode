// deal with authentication here
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Customer = require("../../models/customer");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // user fills out the form do a POST req here
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  var customerID
  Customer.findOne({email:req.body.email}).then(customer=>{
    if(!customer){
      const newCustomer = new Customer({
        Firstname:req.body.firstname,
        Lastname:req.body.lastname,
        email:req.body.email
      })
      newCustomer.save().then(doc=>{
        customerID = doc._id
        registUser();
      }).catch(err=>res.status(400).json(err))
    }else{
      customerID = customer._id;
      registUser()
    }
  }).catch(err=>res.status(400).json(err))

function registUser(){
  User.findOne({
    // find out if the email already exists
    email: req.body.email
  }).then(user => {
    // user is the object returned by findOne()
    if (user) {
      // if obj != null then there is an account with the same email
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        // create new user if cannot find the email
        email: req.body.email,
        password: req.body.password,
        customerID:customerID
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash; // hash the password from the user and store it back
          newUser
            .save() // use mongoose model to save to mongodb mlab
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
}
});

// @route POST api/users/login
// @desc Login User / Returning JWT Token which will then be verified by config/passport.js
// @access Public
// UI login form will send post req to backend
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user email {email} = {email : email}
  User.findOne({
    email
  }).populate("customerID").then(user => {
    if (!user) {
      // if user not found
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // if user found in the data base then check the password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched
        const payload = {
          id: user.id
        }; // create JWT Payload

        //Sign Token as a sign of success validation
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              // sent to some cloud or local storage
              email: email,
              firstname:user.customerID.Firstname,
              lastname:user.customerID.Lastname,
              rewardPoints:user.rewardPoints,
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc return current user
// @access private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }), // not using session
  (req, res) => {
    Customer.findById(req.user.customerID)
    .then( customer => {
      res.json({
        id: req.user.id,
        firstName: customer.Firstname,
        lastName: customer.Lastname,
        email: req.user.email,
        rewardPoints:req.user.rewardPoints
      });
    })
    
  }
);
// export so server.js can use this
module.exports = router;
