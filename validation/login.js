const Validator = require("validator");
const isEmpty = require("./is-empty");
// this will be sent to register route in routes/users.js
module.exports = function validateLoginInput(data) {
  let errors = {};

  // if it is empty change it to empty string so Validator can work
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // if errors isEmpty() is true -> no valid input
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
