var mongoose = require('mongoose');

var options = { promiseLibrary: require('bluebird'), useNewUrlParser: true };
require('dotenv').config();

// var mongodbUri = process.env.DATABASEURL;
var mongodbUri = "mongodb://localhost:27017/Restaurant";
// console.log(process.env.DATABASEURL);
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;
console.log(mongodbUri);

conn.on('error', console.error.bind(console, 'connection error:'));