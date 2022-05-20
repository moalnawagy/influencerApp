const { bool } = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100

    },
    phone: {
        type: String,
        maxLength: 14,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: "https://www.menzil.mr/assets/web/images/agents/dummy.jpeg"
    }
}, {
    timestamps: true,
})

UserSchema.pre('insertMany', async(next, dox) => {

    const rounds = process.env.HASH_ROUNDS
    dox.password = await bcrypt.hash(dox.password, Number(rounds))
    next()
})

UserSchema.post('insertMany', async(dox, next) => {

    dox[0].password = undefined

    next()
})


const User = mongoose.model("User", UserSchema);

module.exports = User