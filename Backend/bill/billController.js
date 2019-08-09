const   express     = require("express"),
        router      = express.Router(),
        mongoose    = require("mongoose"),
        Order       = require("./order");

router.get("/order/:orderId",(req,res,next)=>{
    Order.findById(req.params.orderId,(err,foundOrder)=>{
        if(err){
            res.status(404).send({error: err});
        } else {
            res.status(200).send(foundOrder);
        }
    })
});
        

module.exports = router;