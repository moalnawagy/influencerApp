const Joi = require("joi");

const PostValidation = Joi.object({
    title: Joi.string().min(3).max(20),
    desc: Joi.string().min(3).max(150),
})



module.exports = { PostValidation }