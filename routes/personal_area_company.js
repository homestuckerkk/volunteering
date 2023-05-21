var express = require('express');
const model = require(`../model/model`);
var router = express.Router();
const jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.cookies.token, 1);
  var token = req.cookies.token;
  var decoded_token = jwt.verify(token, "789567");
  console.log(decoded_token);
  if (decoded_token != 'undefined') {
    model.getInfoActivity((err, rows) => {
      if (err) {
        console.log(err);
        res.redirect('/auto');
      } else {
        let data = { name: decoded_token["name"], email: decoded_token["email"], rows : rows }
        res.render('personal_area_company', data);
      };
    }, decoded_token.id)
  } else {
    res.status(401).send(error);
  }
})

module.exports = router;