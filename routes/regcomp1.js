const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const { check } = require('express-validator');

router.post('/', function (req, res, next) {
    if (check(req.body.name_of_company).notEmpty() && check(req.body.name_of_company).isString()) {
        if (check(req.body.email).isEmail()) {
            if (check(req.body.name_of_creator).notEmpty() && check(req.body.name_of_creator).isString()){
                if (check(req.body.type).notEmpty()) {
                    if (req.body.password.length >= 8 && req.body.password==req.body.password1) {
                        let a = [req.body.name_of_company, req.body.name_of_creator, req.body.email, req.body.type, req.body.password, req.body.file, "company"]
                        console.log(a);
                        model.setRegistrationCompany((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/auto");
                            };
                        }, a)
                    } else {
                        res.send("Неверно введённые данные, a");
                    }
                } else {
                    res.send("Неверно введённые данные, b");
                }
            } else {
                res.send("Неверно введённые данные, c");
            }
        } else {
            res.send("Неверно введённые данные, d");
        }
    } else {
        res.send("Неверно введённые данные, f");
    }
})

module.exports = router;