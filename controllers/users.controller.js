const User = require('../models/user.model');
const tokens = require('../config/tokens.config');
const mailer = require('../services/mailer.services');
const jwt = require('jsonwebtoken');


module.exports.create = async (req, res) => {
    User.create(req.body)
    .then((user) => {
        mailer.sendVerificationEmail(user);
        res.status(201).json(user);
    })
    .catch((error) => {
        res.status(400).json(error);
    });
}

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            if (user.verified === false) {
                return res.status(401).json({ message: 'User not verified' });}
        user.checkPassword(req.body.password).then((match) => {
        if (match) {
        const token = tokens.createSesssion(user)
        res
         .header("Set-Cookie", `session_token=${token}; HttpOnly`)
         .json({ message: 'Logged in' });
        }else{
        res.status(400).json({ message: 'Incorrect password' });
        }
    });
       } else {
        res.status(401).json({ message: 'User not found' });
        }
    });
     };

module.exports.verify = (req, res) => {
    User.findById(req.params.id)    
    .then((user) => {
        const token = req.query.token;
        const payload = jwt.verify(token, "super secret")

        if (user.id !== payload.sub) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        user.verified = true;

        user.save().then(() => {
            res.status(200).json({ message: 'User verified' });
        });
    })
        .catch((error) => {
            res.status(400).json(error);
        });
    };








