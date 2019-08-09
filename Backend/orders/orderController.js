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
        _id         : new mongoose.Types.ObjectId(),
        id          : id,
        restaurant  : req.params.restId,
        table       : req.body.table,
        order       : req.body.order
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
    Order.findById(req.params.orderId)
    .exec()
    .then(foundOrder => {
        if(foundOrder) {
            foundOrder.order.push(result);
            foundOrder.save();
            res.status(200).send({message: "New Order added"})
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
            msg: "Updated successfully"
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                msg: err
            });
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