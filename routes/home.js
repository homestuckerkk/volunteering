var express = require('express');
var router = express.Router();
const model = require(`../model/model`);
var jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
  if (req.cookies.token != undefined){
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    model.getInfoActivityForHome((err, rows) => {
      if (err) {
        console.log(err);
      } else {
        let data = { rows: rows, role: decoded_token['role']}
        res.render('home', data);
      };
    })
  } else {
    model.getInfoActivityForHome((err, rows) => {
      if (err) {
        console.log(err);
      } else {
        let data = { rows: rows }
        res.render('home', data);
      };
    })
  }
});

module.exports = router;