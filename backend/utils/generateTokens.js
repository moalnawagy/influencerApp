const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETE_KEY, { expiresIn: "10d" })
}

module.exports = generateToken