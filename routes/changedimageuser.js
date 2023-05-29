var model = require(`../model/model`);
var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    let a = [req.file.filename]
    console.log(a);
    model.setImageUser((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/personal_area_user');
        };
    },a)
})

module.exports = router;