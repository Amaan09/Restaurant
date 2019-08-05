const mongoose = require("mongoose");

const waiterSchema = mongoose.Schema({
    _id             : mongoose.Schema.Types.ObjectId,
    restaurant      : {
        type        : mongoose.Schema.Types.ObjectId,
        ref         : 'Restaurant',
        required    : true
    },
    name            : String,
    email           : {
        type        : String,
        unique      : true
    },
    password        : String,
    mobile          : {
        type        : Number,
        unique      : true
    },
    address         : String,
    createdTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Waiter', waiterSchema);