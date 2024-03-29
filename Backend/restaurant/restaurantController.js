const   express         = require("express"),
        router          = express.Router(),
        mongoose        = require("mongoose"),
        Restaurant      = require("./restaurant"),
        bcrypt          = require('bcrypt'),
        saltRounds      = 10;

router.post("/:adminId",(req, res, next) => {
    var password = req.body.password;
    var hash = bcrypt.hashSync(password, saltRounds);
    const restaurant = new Restaurant({
        _id         : new mongoose.Types.ObjectId(),
        admin       : req.params.adminId,
        location    : req.body.locationId,
        name        : req.body.name,
        password    : hash,
        email       : req.body.email,
        mobile      : req.body.mobile,
        address     : req.body.address
    });
    restaurant
        .save()
        .then(result => {
            res.status(200).send({
                message: "Restaurant details stored by admin"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.get("/",(req, res, next) => {
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
    Restaurant.find({}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
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

// showing admin added restaurants.
router.get("/admin/:adminId", (req, res, next) => {
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
    Restaurant.find({"admin":req.params.adminId}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
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

router.get("/:restId",(req, res, next) => {
    const id = req.params.restId;
    Restaurant.findById(id)
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


router.put("/:restId",(req, res, next) => {

    const id = req.params.restId;

    if (req.body.hasOwnProperty('password')) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    Restaurant.findByIdAndUpdate(id, req.body)
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
    Restaurant.countDocuments().exec((err, result) => {
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