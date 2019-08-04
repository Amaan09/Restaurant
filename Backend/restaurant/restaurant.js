const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
    adminId     : {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'Admin' 
    },
    // locationId  : {
    //   type      : monogoose.Schema.Types.ObjectId,
    //   ref       : 'Location'
    // },
    name        : String,
    email       : String,
    password    : String,
    mobile      : Number,
    kyc         : String,
    address     : String,
    createdTime : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);