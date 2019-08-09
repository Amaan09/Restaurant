const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    id          : String,
    order       : {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Order'
    },
    total       : Number,
    createdTime : { type: Date,default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);