// deal with authentication here
const express = require('express');
const router = express.Router();

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
// this will append to home route 'localHost:5000/api/profile/test'
// res.json will return json object 
router.get('/test', (req, res) => res.json({
    msg: "Profile Works"
}));

// export so server.js can use this
module.exports = router;