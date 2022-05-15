const { SigninValidation, SignupValidation } = require('./validationModels/user.validation.model')


const validateSignup = async(req, res, next) => {
    const { first_name, last_name, email, password, age, phone, plane, image } = req.body
    console.log(req.body);
    const { error } = await SignupValidation.validate({ first_name, last_name, email, password, age, phone, plane, image })
    if (error == undefined) {
        next()
    } else {
        res.status(400).json({ error })
    }
}

const validateSignin = async(req, res, next) => {
    const { email, password } = req.body
    const { error } = await SigninValidation.validate({ email, password })
    if (error == undefined) {
        next()
    } else {
        res.status(400).json({ error })
    }
}


module.exports = { validateSignup, validateSignin }