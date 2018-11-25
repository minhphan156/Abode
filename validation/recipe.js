const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRecipeInput(data) {
  let errors = {};

  // data.title = !isEmpty(data.title) ? data.title : "";
  // data.description = !isEmpty(data.description) ? data.description : "";
  // data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : [];
  // data.image = !isEmpty(data.image) ? data.image : "";
  // data.steps = !isEmpty(data.steps) ? data.steps : [];

  if (!Validator.isLength(data.title, { min: 2, max: 50 })) {
    errors.title = "Title must be between 5 and 50 characters long";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.description, { min: 10 })) {
    errors.description = "Description must be at least 10 characters long";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "image field is required";
  }

  if (Validator.isEmpty(data.steps)) {
    errors.steps = "steps field is required";
  }

  if (Validator.isEmpty(data.ingredients)) {
    errors.ingredients = "Description field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
