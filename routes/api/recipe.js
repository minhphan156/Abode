const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Recipe model
const Recipe = require("../../models/Recipe");

// Load Profile model
const Profile = require("../../models/Profile");

// @route   POST api/recipes/create
// @desc    Create a new recipe made by logged-in users
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Recipe.findOne({ title: req.body.title }).then(recipe => {
      // If there is already a recipe of the same title..
      if (recipe) {
        return res.status(400).json({ title: "That title is already taken." });
      } else {
        const newRecipe = new Recipe({
          userID: req.user.id,
          author: req.body.author,
          title: req.body.title,
          image: req.body.image,
          steps: req.body.steps,
          date: Date(),
          description: req.body.description,
          ingredients: req.body.ingredients,
          // ingredientsProducts: req.body.ingredientsProducts,
          // TO-DO: add ingredients feature
          likes: []
        });

        const profileRecipe = {
          userID: req.user.id,
          author: req.body.author,
          title: req.body.title,
          image: req.body.image,
          steps: req.body.steps,
          date: Date(),
          description: req.body.description,
          ingredients: req.body.ingredients,
          // ingredientsProducts: req.body.ingredientsProducts,
          // TO-DO: add ingredients feature
          likes: []
        };

        Profile.findOne({ user: req.user.id })
          .then(profile => {
            // If the user had set up their profile, their recipe will be saved to their recipe array

            profile.recipe.unshift(profileRecipe);

            console.log(profile);
            Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profile },
              { new: true }
            )
              .then(() => console.log("recipe added to profile"))
              .catch(err => console.log(err));
          })
          .catch(err => res.status(200).json(profileRecipe));

        newRecipe
          .save()
          .then(recipe => res.json(recipe))
          .catch(err => {
            res.status(500).json({ error: "Recipe failed to save" });
          });
      }
    });
  }
);

// @route   GET api/recipes/viewall
// @desc    Get all recipes
// @access  Public
router.get("/", (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: "No recipes found" }));
});

module.exports = router;
