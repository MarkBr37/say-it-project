const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { User, generateAuthToken } = require('../models/user')

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if( error ) return res.status(400).send(error.details);

    const errorObj = [{
        "message": "Email or Password is incorrect",
        "path": [
            "email"
        ],
    }];

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send(errorObj);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send(errorObj);

    res.send(generateAuthToken(user));

});

function validate(user){

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false }}).required(),
        password: Joi.string().min(6).max(255).required()
    })
    const options = {abortEarly:false};
    return schema.validate(user, options);
}

module.exports = router;
