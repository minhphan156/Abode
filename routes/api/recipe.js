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

<<<<<<< HEAD


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
=======
// @route   GET api/recipes/viewall
// @desc    Get all recipes
// @access  Public
router.get("/", (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipesfound: "No recipes found" }));
});

// @route   GET api/recipes/:id
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
    .catch(err => {
      res.status(400).json({
        norecipefound: "Such recipe does not exist"
      });
    });
});

// @route DELETE api/recipes/:id
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

            // If the user had set up their profile, the recipe will be deleted from their recipe array.
            if (profile) {
              const removeIndex = profile.recipes.map(item =>
                item.id.indexOf(req.params.id)
              );
              profile.recipes.splice(removeIndex, 1);
              profile
                .save()
                .then()
                .catch(err =>
                  res
                    .status(500)
                    .json({ error: "Failed to remove recipe from profile" })
                );
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

//  @route  PUT api/recipes/:id
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

              const { errors, isValid } = validateRecipeInput(req.body);

              if (!isValid) {
                return res.status(400).json(errors);
              }

              (recipe.title = req.body.title),
                (recipe.date = Date()),
                (recipe.description = req.body.description),
                (recipe.ingredients = req.body.ingredients),
                (recipe.ingredientsProducts = req.body.ingredientsProducts);

              return recipe
                .save()
                .then(recipe => res.json(recipe))
                .catch(err => {
                  res.status(500).json({ error: "Failed to save" });
                });
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
        res.status(401).json({ notauthorized: "User must be logged in" })
      );
  }
);

//  @route  POST api/recipes/like/:id
//  @desc   Registered users can like recipes
//  @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Recipe.findById(req.params.id)
          .then(recipe => {
            if (
              recipe.likes.filter(
                likes => likes.user.toString() === req.user.id
              ).length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: "User already liked this recipe" });
            }
            recipe.likes.unshift({ user: req.user.id });

            recipe.save().then(recipe => res.json(recipe));
          })
          .catch(err =>
            res.status(404).json({ norecipefound: "No such recipe exists" })
          );
      })
      .catch(err =>
        res.status(401).json({ notauthorized: "User must be logged in" })
      );
  }
);

//  @route  POST api/recipes/unlike/:id
//  @desc   Registered users can remove their likes
//  @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Recipe.findById(req.params.id)
          .then(recipe => {
            if (
              recipe.likes.filter(
                likes => likes.user.toString() === req.user.id
              ).length === 0
            ) {
              return res
                .status(400)
                .json({ notLiked: "User has not liked this post" });
            }

            const removeIndex = recipe.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            recipe.likes.splice(removeIndex, 1);

            recipe.save().then(recipe => res.json(recipe));
          })
          .catch(err =>
            res.status(404).json({ norecipefound: "No such recipe exists" })
          );
      })
      .catch(err =>
        res.status(401).json({ notauthorized: "User must be logged in" })
      );
  }
);
>>>>>>> dev

module.exports = router;
