const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Recipe model
const Recipe = require("../../models/Recipe");

// Validation
const validateRecipeInput = require("../../validation/recipe");

// @route   POST api/recipe/create
// @desc    Create a new recipe made by logged-in users
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Recipe.findOne({ title: req.body.title }).then(recipe => {
      // If there is already a recipe of the same title..
      if (recipe) {
        return res.status(400).json({ title: "That title is already taken." });
      } else {
        const newRecipe = new Recipe({
          author: req.user.id,
          title: req.body.title,
          date: req.body.date,
          description: req.body.description,
          ingredients: req.body.ingredients
        });

        newRecipe.save().then(recipe => res.json(recipe));
      }
    });
  }
);

module.exports = router;
