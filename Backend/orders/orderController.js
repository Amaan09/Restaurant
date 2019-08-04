const   express     = require("express"),
        router      = express.Router(),
        mongoose    = require("mongoose"),
        Order       = require("./order");


// Get details of all locations with pagination to get limited records or all records
router.get("/", (req, res, next) => {
    Order.find()
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
router.post("/", (req, res, next) => {
    const order = new Order({
        _id         : new mongoose.Types.ObjectId(),
        menu        : req.body.menu,
        qunatity    : req.body.qunatity
    });
    order
        .save()
        .then(result => {
            res.status(200).send({
                message: "New Order saved"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

//  getting Table details by a specific Table id
router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id).
        exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).send(doc);
            } else {
                res.status(404).send({ message: "No valid entry found for provided Id" });
            }
        })
        .catch(err => {
            console.log(err);
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