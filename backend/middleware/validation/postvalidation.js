const { PostValidation } = require("./validationModels/post.validation.model");



const validatePost = async(req, res, next) => {
    const { title, desc } = req.body
    const { error } = await PostValidation.validate({ title, desc })
    if (error == undefined) {
        next()
    } else {
        res.status(400).json({ error })
    }
}



module.exports = { validatePost }