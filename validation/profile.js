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
  data.ccNumber = !isEmpty(data.ccNumber) ? data.ccNumber : "";
  data.ccExp = !isEmpty(data.ccExp) ? data.ccExp : "";
  data.ccCvv = !isEmpty(data.ccCvv) ? data.ccCvv : "";

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
  
  let ccErrors = {}
  // Check Credit Card
  if (!Validator.isCreditCard(data.ccNumber)) {
    ccErrors.ccNumber = "Credit Card number invalid";
  }
  if (Validator.isEmpty(data.ccNumber)) {
    ccErrors.ccNumber = "Credit Card number required";
  }

  if (!Validator.isLength(data.ccExp, { min: 5, max: 5 })) {
    ccErrors.ccExp = "Expiration date must be five characters";
  }
  if (Validator.isEmpty(data.ccExp)) {
    ccErrors.ccExp = "Expiration date required";
  }

  if (!Validator.isLength(data.ccCvv, { min: 3, max: 3 })) {
    ccErrors.ccCvv = "CVV number invalid";
  }
  if (Validator.isEmpty(data.ccCvv)) {
    ccErrors.ccCvv = "CVV number required";
  }
  if(data.ccNumber ==="" &&
    data.ccExp === "" &&
    data.ccCvv === "" &&
    data.delivery){}
  else{
    errors = {...errors, ...ccErrors}
  }
  
  // if errors isEmpty() is true -> no valid input
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
