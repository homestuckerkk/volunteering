const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    res.cookie("data", {"district": req.body.district, "type": req.body.type}, {
        httpOnly: true
    });
    res.redirect("/homechosen")
})

module.exports = router;