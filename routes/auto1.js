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
            token = jwt.sign({ id: rows[0]["user_id"], email: rows[0]["email"], password: rows[0]["password"] }, "789567", { expiresIn: "24h" });
            res.json({
                success: true,
                data: {
                    token: token
                },
            });
            return res.redirect('/personal_area_user');
        };
    }, data)
})



module.exports = router;