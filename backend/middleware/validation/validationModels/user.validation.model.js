const Joi = require("joi");

const SignupValidation = Joi.object({
    first_name: Joi.string().alphanum().min(2).max(30).required(),
    last_name: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(85),
    phone: Joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).required(),
    image: Joi.string().allow("", null),
    plane: Joi.string().valid('basic', 'premium').required()



})

const SigninValidation = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
})

module.exports = { SigninValidation, SignupValidation }