const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/register', function (req, res) {
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.json({
                user: user, 
                message: 'User successfully created!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({error: err}))
});


router.post("/login", (req, res) => {
    User.findOne({ where: { username: req.body.user.username } }).then((user) => {
        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function (
                err,
                matches
            ) {
                if (matches) {
                    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                        expiresIn: 60 * 60 * 24,
                    });
                    res.json({
                        user: user,
                        message: "Successfully authenticated.",
                        sessionToken: token,
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." });
                }
            });
        } else {
            res.status(403).send({ error: "User not found." });
        }
    });
});


module.exports = router;
