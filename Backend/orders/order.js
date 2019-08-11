const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    id          : String,
    restaurant  : {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Restaurant'
    },
    table       : {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Table'
    },
    order       : [{
        name        : String,
        price       : Number,
        quantity    : Number,
        totalPrice  : Number
    }],
    final       : {
        type    : Boolean,
        default : false
    },
    grandTotal  : {
        type    : Number,
        default : 0
    },
    createdTime : { type: Date, default: Date.now },
    lastUpdated:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);