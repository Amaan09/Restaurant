const   express     = require("express"),
        router      = express.Router(),
        mongoose    = require("mongoose"),
        Waiter      = require("./waiter"),
        bcrypt      = require('bcrypt'),
        saltRounds  = 10;

router.post("/:restId", (req, res, next) => {
    var password = req.body.password;
    var hash = bcrypt.hashSync(password, saltRounds);
    const waiter    = new Waiter({
        _id         : new mongoose.Types.ObjectId(),
        restaurant  : req.params.restId,
        location    : req.body.location,
        name        : req.body.name,
        password    : hash,
        email       : req.body.email,
        mobile      : req.body.mobile,
        address     : req.body.address
    });
    waiter
        .save()
        .then(result => {
            res.status(200).send({
                message: "Waiter details stored"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

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
    Waiter.find({"restaurant":req.params.restId}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
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

router.get("/", (req, res, next) => {
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
    Waiter.find({}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
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



router.get("/:waiterId", (req, res, next) => {
    const id = req.params.waiterId;
    Waiter.findById(id)
        .exec()
        .then(doc => {
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


router.put("/:waiterId", (req, res, next) => {

    const id = req.params.waiterId;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    Waiter.findByIdAndUpdate(id, req.body)
        .exec()
        .then(result => {
            res.status(200).send({ msg: "Updated successfully" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                msg: err
            });
        });
});

router.get("/pages/count", function (req, res) {
    Waiter.countDocuments().exec((err, result) => {
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