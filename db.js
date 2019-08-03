var mongoose = require('mongoose');

var options = { promiseLibrary: require('bluebird'), useNewUrlParser: true };
require('dotenv').config();

var mongodbUri = process.env.DATABASEURL;
console.log(process.env.DATABASEURL);
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));