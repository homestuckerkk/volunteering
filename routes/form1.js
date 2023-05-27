const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    let a = [req.body.name, req.body.curator, req.body.address, req.body.district_activity, req.body.date, req.body.time, req.body.type, decoded_token.id]
    console.log(a);
    model.setInfoActivity((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        };
    },a)
})

module.exports = router;