const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    name        : String,
    password    : String,
    email       : {
        type    : String,
        unique  : true
    },
    mobile      : {
        type    : String,
        unique  : true
    },
    createdTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', adminSchema);