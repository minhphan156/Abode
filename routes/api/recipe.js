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



router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body)
    Recipe.deleteOne({title: req.body.title})
    Profile.findOne({user: req.user.id}).then(profile => {
      console.log(profile)
      const profileFields = {};
      profileFields.address = {};
      if (profile.street) profileFields.address.street = profile.street;
      if (profile.apartment) profileFields.address.apartment = profile.apartment;
      if (profile.city) profileFields.address.city = profile.city;
      if (profile.zip) profileFields.address.zip = profile.zip;
      if (profile.homeState) profileFields.address.homeState = profile.homeState;

      profileFields.creditCard = {};
      if (profile.ccNumber) profileFields.creditCard.ccNumber = profile.ccNumber;
      if (profile.ccExp) profileFields.creditCard.ccExp = profile.ccExp;
      if (profile.ccCvv) profileFields.creditCard.ccCvv = profile.ccCvv;

      for(var i = 0; i < profile.recipe; i++){
        if(profile.recipe[i].title == req.body.title){
          profile.recipe.splice(i, 1)
        }
      }
      Profile.findOneAndUpdate(
        {user: req.user.id},
        {$set: profileFields}
      )
    })
  }
)

module.exports = router;
