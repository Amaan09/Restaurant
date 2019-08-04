const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    _id      : mongoose.Schema.Types.ObjectId,
    name     : String,
    type     : String,
    category : String,
    price    : Number
});

module.exports = mongoose.model('Menu', menuSchema);