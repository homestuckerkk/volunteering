const model = require(`../model/model`);
var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    let a = [req.body.name, req.body.email, req.body.phone_number, req.body.date_of_birth, req.body.password, "user"]
    console.log(a);
    model.setRegistrationUser((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        };
    },a)
})

module.exports = router;