const Joi = require('joi');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    }
})

const User = mongoose.model('User', userSchema)

function generateAuthToken(user){
    const token = jwt.sign({_id: user._id, name: user.name}, config.jwtKey )
    return token;
}

function validateUser(user){

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false }}).required(),
        password: Joi.string().min(6).max(255).required(),
        name: Joi.string().min(3).max(255).required()
    })
    const options = {abortEarly:false};
    return schema.validate(user, options);
}


exports.User = User;
exports.validateUser = validateUser;
exports.generateAuthToken = generateAuthToken;