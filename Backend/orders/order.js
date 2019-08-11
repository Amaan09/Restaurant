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
        quantity    : Number
    }],
    final       : {
        type    : Boolean,
        default : false
    },
    createdTime     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);