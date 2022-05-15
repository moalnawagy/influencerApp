const bcrypt = require('bcrypt');
const rounds = process.env.HASH_ROUNDS


const hashingPassword = async(req, res, next) => {
    const { password } = req.body

    bcrypt.hash(password, Number(rounds)).then(async(hashed) => {
        req.body.password = hashed
        next()
    })
}

module.exports = hashingPassword