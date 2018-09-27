// deal with authentication here
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input validation
const validateProfileInput = require("../../validation/profile");

// Load Profile model
const Profile = require("../../models/Profile");
// Load User model
const User = require("../../models/User");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
// this will append to home route 'localHost:5000/api/profile/test'
// res.json will return json object
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile Works"
  })
);

// @route GET api/profile
// @desc Get current user's profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    // find user-object's ID
    Profile.findOne({ user: req.user.id })
      .populate("user", "email") // THIS DIDNT WORK, WHY?
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// @desc Create or edit user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //  Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    profileFields.address = {};
    if (req.body.street) profileFields.address.street = req.body.street;
    if (req.body.apartment)
      profileFields.address.apartment = req.body.apartment;
    if (req.body.city) profileFields.address.city = req.body.city;
    if (req.body.zip) profileFields.address.zip = req.body.zip;
    if (req.body.homeState)
      profileFields.address.homeState = req.body.homeState;

    profileFields.creditCard = {};
    if (req.body.ccNumber)
      profileFields.creditCard.ccNumber = req.body.ccNumber;
    if (req.body.ccExp) profileFields.creditCard.ccExp = req.body.ccExp;
    if (req.body.ccCvv) profileFields.creditCard.ccCvv = req.body.ccCvv;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // there is a profile -> Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
    // TODO:
    // add Recipe
    // add History
  }
);

// @route POST api/profile/history
// @desc Add order to history
// @access Private
router.post(
  "/history",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newHist = {
        products: req.body.products,
        date: req.body.date,
        total: req.body.total,
        discount: req.body.discount
      };

      // add to history array
      profile.history.push(newHist);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// export so server.js can use this
module.exports = router;
