const   express     = require("express"),
        router      = express.Router(),
        mongoose    = require("mongoose"),
        Menu        = require("./menu");


// Get details of all locations with pagination to get limited records or all records
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
    Menu.find({}, {}, { skip: skip, limit: limit }).sort({ id: -1 })
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

// admin creates the location which required to be filled by the user, employer or the consultant
router.post("/", (req, res, next) => {
    const menu = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name        : req.body.name,
        type        : req.body.type,
        category    : req.body.category,
        price       : req.body.price,
        image       : req.body.image
    });
    menu
        .save()
        .then(result => {
            res.status(200).send({
                message: "New menu item added"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

//  getting location details by a specific location id
router.get("/:menuId", (req, res, next) => {
    const id = req.params.menuId;
    Menu.findById(id).
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

// updating location details
router.put("/:menuId", (req, res, next) => {

    const id = req.params.menuId;
    Menu.findByIdAndUpdate(id, req.body)
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
    Menu.countDocuments().exec((err, result) => {
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