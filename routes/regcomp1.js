const model = require(`../model/model`);
var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    let a = [req.body.name_of_company, req.body.name_of_creator, req.body.email, req.body.type, req.body.password, req.body.file, "company"]
    console.log(a);
    model.setRegistrationCompany((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        };
    }, a)
})

module.exports = router;