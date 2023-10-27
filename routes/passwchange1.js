const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    let a = [decoded_token.email, req.body.oldpassw]
    model.checkinLoginData((err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if (decoded_token.role == 'user') {
                if (req.body.newpassw == req.body.newpassw2){
                    let b = [req.body.newpassw, decoded_token.id]
                    model.changePasswordUser((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/');
                        };
                    }, b)
                } else {
                    res.redirect('/passwordchangeform')
                }
            } else if (decoded_token.role == 'company'){
                if (req.body.newpassw == req.body.newpassw2) {
                    let b = [req.body.newpassw, decoded_token.id]
                    model.changePasswordCompany((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/');
                        };
                    }, b)
                } else {
                    res.redirect('/passwordchangeform')
                }
            }
        };
    }, a)
})


module.exports = router;