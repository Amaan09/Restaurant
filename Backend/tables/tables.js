const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
    restaurant  : {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Restaurant'
    },
    tableNo     : Number,
    available   : {
        type    : Boolean,
        default : true
    }
});

module.exports = mongoose.model('Table', tableSchema);