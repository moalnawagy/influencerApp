const { string } = require('joi');
const mongoose = require('mongoose');

const ReachSchema = mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
})

const Reach = mongoose.model("Reach", ReachSchema);

module.exports = Reach