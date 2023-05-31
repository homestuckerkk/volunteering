const model = require(`../model/model`);
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    res.cookie("data", { "district": req.body.district, "type": req.body.type }, {
        httpOnly: true
    });
    console.log(req.body.district);

    res.redirect("/homechosen")
})


module.exports = router;