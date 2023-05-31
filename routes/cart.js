var express = require('express');
var router = express.Router();
const model = require(`../model/model`);
var jwt = require('jsonwebtoken');

router.get('/:id', function (req, res, next) {
    if (req.cookies.token != undefined) {
        var token = req.cookies.token;
        var decoded_token = jwt.verify(token, "789567");
        console.log(req.params.id, "12222");
        model.getInfoOneActivityForHome((err, rows) => {
            if (err) {
                console.log(err);
            } else {
                let data = { rows: rows, role: decoded_token['role'] }
                res.render('cart', data);
            };
        }, req.params.id)
    } else {
        console.log(req.params.id, "12222");
        model.getInfoOneActivityForHome((err, rows) => {
            if (err) {
                console.log(err);
            } else {
                let data = { rows: rows }
                res.render('cart', data);
            };
        }, req.params.id)
    }
    
});

module.exports = router;