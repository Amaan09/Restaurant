const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    menu        : [{
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Menu'
    }],
    quantity    : Number
});

module.exports = mongoose.model('Order', orderSchema);