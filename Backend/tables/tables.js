const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    restaurant  : {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Restaurant'
    },
    tableNo     : Number
});

module.exports = mongoose.model('Table', tableSchema);