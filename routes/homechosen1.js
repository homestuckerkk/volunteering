const model = require(`../model/model`);
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    console.log(req.body.search_word, 1);
    res.cookie("data", { "district": req.body.district_activity, "type": req.body.type }, {
        httpOnly: true
    });


    res.redirect("/homechosen")
})


module.exports = router;