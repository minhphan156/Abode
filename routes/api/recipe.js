const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Recipe model
const Recipe = require("../../models/Recipe");

// Load Profile model
const Profile = require("../../models/Profile");

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

    Recipe.findOne({ title: req.body.title })
      .then(recipe => {
        // If there is already a recipe of the same title..
        if (recipe) {
          return res
            .status(400)
            .json({ title: "That title is already taken." });
        } else {
          const newRecipe = new Recipe({
            userID: req.user.id,
            author: req.user.name,
            title: req.body.title,
            date: Date(),
            description: req.body.description,
            ingredients: req.body.ingredients,
            likes: {},
            unlikes: {}
          });

          newRecipe.save().then(recipe => res.json(recipe));
        }
      })
      .catch(res.status(404));
  }
);

// @route   GET api/recipe/viewall
// @desc    Get all recipes
// @access  Public
router.get("/", (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: "No recipes found" }));
});

// @route   GET api/recipe/:id
// @desc    Get a specific recipe
// @access  Public
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      if (recipe) {
        return res.json(recipe);
      } else {
        return res
          .status(404)
          .json({ norecipefound: "Such recipe does not exist" });
      }
    })
    .catch(err =>
      res.status(400).json({
        norecipefound: "Such recipe does not exist"
      })
    );
});

// @route DELETE api/recipe/:id
// @desc  Delete a recipe made by the user who made it
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Recipe.findById(req.params.id)
          .then(recipe => {
            // Check for recipe owner
            if (recipe.userID.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "User not authorized" });
            }
            recipe.remove().then(() => res.json({ success: true }));
          })
          .catch(err =>
            res.status(404).json({ norecipefound: "Recipe doesn't exist" })
          );
      })
      .catch(err =>
        res.status(401).json({ notauthorized: "User is not logged in" })
      );
  }
);

//  @route  PUT api/recipe/:id
//  @desc   Edits an existing recipe created by a user
//  @access Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Recipe.findById(req.params.id)
          .then(recipe => {
            if (recipe) {
              if (recipe.userID.toString() !== req.user.id) {
                return res
                  .status(401)
                  .json({ notauthorized: "User not authorized " });
              }

              (recipe.title = req.body.title),
                (recipe.description = req.body.description),
                (recipe.ingredients = req.body.ingredients),
                (recipe.date = Date());

              recipe.save().then(recipe => res.json(recipe));

              return res.json(recipe);
            } else {
              return res
                .status(404)
                .json({ norecipefound: "No such recipe exists" });
            }
          })
          .catch(err =>
            res.status(404).json({ norecipefound: "No such recipe exists" })
          );
      })
      .catch(err =>
        res.status(401).json({ notauthorized: "user must be logged in" })
      );
  }
);

module.exports = router;
