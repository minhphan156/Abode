// deal with authentication here
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/User');


// @route GET api/users/test
// @desc Tests users route
// @access Public
// this will append to home route 'localHost:5000/api/users/test'
// res.json will return json object 
router.get('/test', (req, res) => res.json({
    msg: "Users Works"
}));

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => { // user fills out the form do a POST req here
    User.findOne({ // find out if the email already exists
            email: req.body.email
        })
        .then(user => { // user is the object returned by findOne()
            if (user) { // if obj != null then there is an account with the same email
                return res.status(400).json({
                    email: 'Email already exists'
                });
            } else {
                const newUser = new User({ // create new user if cannot find the email
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash; // hash the password from the user and store it back
                        newUser
                            .save() // use mongoose model to save to mongodb mlab 
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        });
});

// export so server.js can use this
module.exports = router;