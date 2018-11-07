const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (!Validator.isLength(data.title, { min: 5, max: 50 })) {
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

  if (Validator.isEmpty(data.ingredients)) {
    errors.ingredients = "Ingredients are required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
