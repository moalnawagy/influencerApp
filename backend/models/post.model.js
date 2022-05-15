const { array } = require('joi');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    noOfLikes: { type: Number, default: 0 },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }],
    isPinned: {
        type: Boolean,
        default: false,
    }

}, {
    timestamps: true,
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post