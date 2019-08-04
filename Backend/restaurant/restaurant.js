const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    admin       : {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'Admin',
      required  : true 
    },
    location    : {
      type      : monogoose.Schema.Types.ObjectId,
      ref       : 'Location'
    },
    name        : String,
    email       : String,
    password    : String,
    mobile      : Number,
    address     : String,
    createdTime : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);