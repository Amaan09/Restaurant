const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    name        : String,
    username    : String,
    password    : String,
    email       : String,
    mobile      : Number,
    createdTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', adminSchema);