const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    admin       : {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'Admin',
      required  : true 
    },
    location    : {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'Location',
      required  : true
    },
    name        : String,
    email       : {
    type        : String,
    unique      : true
    },
    password    : String,
    mobile      : {
      type      : Number,
      unique    : true
    },
    address     : String,
    createdTime : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);