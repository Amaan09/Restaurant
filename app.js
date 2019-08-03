const   express     = require("express"),
        app         = express(),
        jwt         = require("jsonwebtoken"),
        mongoose    = require("mongoose"),
        verifyToken = require("./auth/verifyToken"),
        key         = require("./key/key"),
        bodyParser  = require("body-parser");

require('dotenv').config();

mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const adminRoutes = require("./admin/adminController");

app.use("/admin",adminRoutes);

app.get("/",(req,res)=>{
    res.send("Hello world");
});

app.listen(3000,(req,res)=>{
    console.log("Server Started!!!");
});