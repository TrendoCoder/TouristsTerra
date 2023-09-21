var mongoose = require("mongoose");
const Joi = require('joi');

var userSchema = mongoose.Schema({
    email:String,
    userName:String,
    contact:Number,
    password:String,
    confirmPassword:String,
});

function validateUser(data) {
    const schema = Joi.object({
        email:Joi.string().min(10).max(40).required(),
        userName: Joi.string().min(3).max(30).required(),
        contact:Joi.number().min().max().required(),
        password:Joi.string().min(4).max(30).required(),
        confirmPassword:Joi.string().min(4).max(30).required(),
    });
    return schema.validate(data,{abortEarly:false});
}

module.exports.User = User;
module.exports.validateUser = validateUser;