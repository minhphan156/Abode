const Validator = require("validator");
const isEmpty = require("./is-empty");

// this will be sent to register route in routes/users.js
module.exports = function validateProfileInput(data) {
  let errors = {};

  // if it is empty change it to empty string so Validator can work
  data.street = !isEmpty(data.street) ? data.street : "";
  data.apartment = !isEmpty(data.apartment) ? data.apartment : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zip = !isEmpty(data.zip) ? data.zip : "";
  data.homeState = !isEmpty(data.homeState) ? data.homeState : "";

  // Check Address
  if (Validator.isEmpty(data.street)) {
    errors.street = "Street required";
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = "City required";
  }
  if (Validator.isEmpty(data.zip)) {
    errors.zip = "ZIP required";
  }
  if (!Validator.isNumeric(data.zip)) {
    errors.zip = "ZIP invalid";
  }
  if (Validator.isEmpty(data.homeState)) {
    errors.homeState = "Please choose a State";
  }

  // if errors isEmpty() is true -> no valid input
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
