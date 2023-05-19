const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');



router.post('/', function (req, res, next) {
    let data = [req.body.email, req.body.password]
    console.log(data);
    model.checkinLoginData((err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if (rows[1] == "user") {
                token = jwt.sign({ id: rows[0]["id"], email: rows[0]["email"], name: rows[0]["name"], password: rows[0]["password"] }, "789567", { expiresIn: "24h" });
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.redirect('/personal_area_user');
            } else {
                token = jwt.sign({ id: rows[0]["id"], email: rows[0]["email"], name: rows[0]["name_of_company"], password: rows[0]["password"] }, "789567", { expiresIn: "24h" });
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.redirect('/personal_area_company');
            }
        };
    }, data)
})



module.exports = router;