const Joi = require("joi");

const PostValidation = Joi.object({
    title: Joi.string().min(3).max(20),
    desc: Joi.string().min(3).max(150),
    created_by: Joi.string().length(24).required()
})



module.exports = { PostValidation }