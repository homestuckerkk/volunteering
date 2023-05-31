var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/', function (req, res, next) {
  if (req.cookies.token != undefined) {
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    let data = { role: decoded_token["role"] }
    res.render('auto', data);
  } else {
    res.render('auto');
  }
});

module.exports = router;