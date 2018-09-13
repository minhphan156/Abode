// export module file to be available to other components
// mongoURI to connect with mongo database
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};
