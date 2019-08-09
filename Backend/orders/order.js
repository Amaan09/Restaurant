const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    id          : String,
    table       : {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Table'
    },
    order       : [{
        menu        : {
            type    : mongoose.Schema.Types.ObjectId,
            ref     : 'Menu'
        },
        quantity    : Number
    }],
    createdTime     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);