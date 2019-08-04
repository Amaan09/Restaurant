const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    tableNo     : Number
});

module.exports = mongoose.model('Table', tableSchema);