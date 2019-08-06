const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    restaurant  : {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Restaurant'
    },
    name        : String,
    type        : String,
    category    : String,
    price       : Number,
    image       : String,
    available   : {
        type    : Boolean,
        default : true
    }
});

module.exports = mongoose.model('Menu', menuSchema);