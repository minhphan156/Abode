// export module file to be available to other components
// mongoURI to connect with mongo database
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod"); // load keys_prod.js if it is in production environment
} else {
  module.exports = require("./keys_dev"); // load keys_dev.js if it is in dev environment
}
