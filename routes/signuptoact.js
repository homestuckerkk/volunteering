var model = require(`../model/model`);
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


router.post('/', function (req, res, next) {
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    console.log(req.body.idd, 11);
    let a = [req.body.idd, decoded_token['id']]
    if (decoded_token['role'] == 'user'){
        model.signUpToActivity((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/personal_area_user')
            };
        }, a)
    } else {
        res.redirect('/')
    }
})

module.exports = router;