const   express     = require("express"),
        router      = express.Router(),
        mongoose    = require("mongoose"),
        Order       = require("../orders/order"),
        Bill        = require("./bill"),
        moment      = require("moment");

// router.get("/order/:orderId",(req,res,next)=>{

// });
        

module.exports = router;