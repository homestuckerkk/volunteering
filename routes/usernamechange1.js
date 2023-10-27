const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    let a = [req.body.oldusername]
    console.log(a);
    model.checkUsernameUser((err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if (decoded_token.role == 'user') {
                if (req.body.newusername == req.body.newusername2) {
                    let b = [req.body.newusername, decoded_token.id]
                    model.changeUsernameUser((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/');
                        };
                    }, b)
                } else {
                    res.redirect('/usernamechangeform')
                }
            }
        };
    }, a)
})


module.exports = router;