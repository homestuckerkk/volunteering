const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const { check } = require('express-validator');


router.post('/', function (req, res, next) {
    if (check(req.body.name).notEmpty() && check(req.body.name).isString()) {
        if (check(req.body.email).isEmail()) {
            if (check(req.body.phone_number).isMobilePhone()) {
                if (check(req.body.date_of_birth).isDate()) {
                    if (req.body.password.length >= 8 && req.body.password==req.body.password1) {
                        let a = [req.body.name, req.body.email, req.body.phone_number, req.body.date_of_birth, req.body.password, "user"]
                        console.log(a);
                        model.setRegistrationUser((err, rows) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/auto");
                            };
                        }, a)
                    } else {
                        res.send("Неверно введённые данные");
                    }
                } else {
                    res.send("Неверно введённые данные");
                }
            } else {
                res.send("Неверно введённые данные");
            }
        } else {
            res.send("Неверно введённые данные");
        }
    } else {
        res.send("Неверно введённые данные");
    }
})

module.exports = router;