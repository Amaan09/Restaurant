const   express     = require("express"),
        router      = express.Router(),
        mongoose    = require("mongoose"),
        Order       = require("./order"),
        moment      = require("moment");


router.get("/restaurant/:restId", (req, res, next) => {
    var page = parseInt(req.query.page);
    var size = req.query.size;
    if (size === undefined)
        size = 10;
    else
        size = parseInt(req.query.size);
    if (page < 0 || page === 0) {
        response = {
            "error": true,
            "message": "invalid page number, should start with 1"
        };
        res.send(response);
    }
    var skip = size * (page - 1);
    var limit = size;
    Order.find({ "restaurant": req.params.restId}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
        .exec()
        .then(docs => {
            res.status(200).send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
});

router.get("/tables/:tableId", (req, res, next) => {
    var page = parseInt(req.query.page);
    var size = req.query.size;
    if (size === undefined)
        size = 10;
    else
        size = parseInt(req.query.size);
    if (page < 0 || page === 0) {
        response = {
            "error": true,
            "message": "invalid page number, should start with 1"
        };
        res.send(response);
    }
    var skip = size * (page - 1);
    var limit = size;
    Order.find({ "table": req.params.tableId }, {}, { skip: skip, limit: limit }).sort({ id: -1 })
        .exec()
        .then(docs => {
            res.status(200).send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
});

// admin creates the Table which required to be filled by the user, employer or the consultant
router.post("/:restId", (req, res, next) => {
    var random = moment().format("YYYYMMDDHHmmSS");
    var id = random + "ORD";
    const order = new Order({
        _id                 : new mongoose.Types.ObjectId(),
        id                  : id,
        restaurant          : req.params.restId,
        table               : req.body.table,
        order               : req.body.order
    });
    order
        .save()
        .then(result => {
            res.status(200).send({
                message: "order added!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

// adding more orders 
router.post("/add/:orderId",(req,res,next)=>{
    var result = req.body.order;
    Order.findByIdAndUpdate(req.params.orderId,{$push:{order:{$each:req.body.order}}})
    .exec()
    .then(foundOrder => {
        if(foundOrder) {
            res.status(200).send({message: "New Orders pushed to existing orderId"})
        } else {
            res.status(404).send({ message: "No valid entry found for provided Id" });
        }
    })
    .catch(err => {
        res.status(500).send({ error: err });
    });
});

//  getting Table details by a specific Table id
router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).send(doc);
            } else {
                res.status(404).send({ message: "No valid entry found for provided Id" });
            }
        })
        .catch(err => {
            res.status(500).send({ error: err });
        });
});

// updating Table details
router.put("/:orderId", (req, res, next) => {

    const id = req.params.orderId;
    Order.findByIdAndUpdate(id, req.body)
        .exec()
        .then(result => {
            res.status(200).send({msg: "Updated details"})
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                msg: err
            });
        });
});

//button to mark the final order 
router.post("/final/:orderId", async(req, res, next) => {
    
    try {
        const id = req.params.orderId;
        let order = await Order.findByIdAndUpdate(id, { final: "true" }).exec();
        Order.aggregate([
            {
                "$project": {
                    "number": 1,
                    "total": {
                        "$sum": {
                            "$map": {
                                "input": "$order",
                                "as": "order",
                                "in": {
                                    "$multiply": [
                                        { "$ifNull": ["$$order.quantity", 0] },
                                        { "$ifNull": ["$$order.price", 0] }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            {
                "$group": {
                    "_id": "$id",
                    "total": { "$sum": "$total" }
                }
            }
        ]).exec((err, result) => {
            if (err) {
                console.log(err);
            } else {
                result.forEach(element=>{
                    order.grandTotal = element.total;
                    order.save();
                });
                

            }
        });
        res.status(200).send({ msg: "Bill is printed at the counter please collect" });
    } catch (error) {
        res.status(500).send({ err: error.toString(), msg: err });
    }
    
});

router.get("/analytics/date",function(req,res){
    Order.aggregate([
        {
            $group: {
                _id: {

                    year: { $year: "$createdTime" },

                    month: { $month: "$createdTime" },

                    day: { $dayOfMonth: "$createdTime" }

                }, count: { $sum: "$grandTotal" }
            }
        }
    ]).exec((err, result) => {
        if (err) {
            res.status(404).send({ msg: err });
        } else {
            res.status(200).send(result);
        }
    });
});

router.get("/pages/count", function (req, res) {
    Order.countDocuments().exec((err, result) => {
        if (err) {
            res.status(404).send({ msg: err });
        } else {
            var page = Math.ceil(result / 10);
            res.status(200).send({
                pages: page,
                count: result
            });
        }
    });
});


module.exports = router;