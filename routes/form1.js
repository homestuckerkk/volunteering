const model = require(`../model/model`);
var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    let a = [req.body.curator, req.body.address, req.body.date, req.body.time, req.body.type]
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