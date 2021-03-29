const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userinfo = require('../models/userinfo');

router.post('createuserinfo', (req, res) =>{
    UserInfo.create({
        dateOfBirth: req.body.userInfo.dateOfBirth,
        age: req.body.userInfo.age,
        heightInInches: req.body.userInfo.heightInInches,
        goal: req.body.userInfo.goal,
        userId: req.user.id
    })
    .then(userInfo => res.status(200).json(userInfo))
    .catch(err => console.log(err));
})


router.delete('/:userinfo', validateSession, function(req, res) { 
    const query = { where: {userInfo: req.params.userInfo}};

Log.destroy(query)
.then(() => res.status(200).json({message: "User Entry Removed"}))
.catch((err) => res.status(500).json({ error: err}));
});
