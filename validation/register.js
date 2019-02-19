const Validator = require("validator");
const isEmpty = require("./is-empty");
// this will be sent to register route in routes/users.js
module.exports = function validateRegisterInput(data) {
  let errors = {};

  // if it is empty change it to empty string so Validator can work
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (
    !Validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords must match";
  }

  // if errors isEmpty() is true -> no valid input
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
