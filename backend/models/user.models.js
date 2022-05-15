const { bool } = require('joi');
const mongoose = require('mongoose');

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



const User = mongoose.model("User", UserSchema);

module.exports = User