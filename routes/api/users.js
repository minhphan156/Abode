// deal with authentication here
const express = require('express');
const router = express.Router();

// @route GET api/users/test
// @desc Tests users route
// @access Public
// this will append to home route 'localHost:5000/api/users/test'
// res.json will return json object 
router.get('/test', (req, res) => res.json({
    msg: "Users Works"
}));

// export so server.js can use this
module.exports = router;