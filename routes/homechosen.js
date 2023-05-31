var express = require('express');
var router = express.Router();
const model = require(`../model/model`);
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  var data = [req.cookies.data.district, req.cookies.data.type]
  if (req.cookies.token != undefined) {
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    model.getInfoActivityForSearch((err, rows) => {
      if (err) {
        console.log(err);
      } else {
        let data = { rows: rows, role: decoded_token["role"] }
        res.render('homechosen', data);
      };
    }, data)
  } else {
    res.render('auto');
    model.getInfoActivityForSearch((err, rows) => {
      if (err) {
        console.log(err);
      } else {
        let data = { rows: rows}
        res.render('homechosen', data);
      };
    }, data)
  }
  

  
});

module.exports = router;