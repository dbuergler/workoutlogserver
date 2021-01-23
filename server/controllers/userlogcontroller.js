const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');


router.post('/register', function (req, res) {
    User.create({
        username: req.body.user.username,
        password: req.body.user.password
    })
    .then(
        function createSuccess(user) {
            res.json({
                user: user
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))
});

router.post('/login', function (req, res){
    User.findOne({
        where: {
            username: req.body.user.username
        }
    })
    .then(function loginSuccess(user){
        if (user) {
            res.status(200).json({
                user: user
            })
        } else {
            res.status(500).json({ error: 'User does not exist'})
        }

    })
    .catch(err => res.status(500).json({error: err}))
});


module.exports = router;
