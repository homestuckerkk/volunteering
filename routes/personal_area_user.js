var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
  var decoded_token = jwt.verify(token, "789567");
  if (decoded_token){
    res.render('personal_area_user');
  }
});

module.exports = router;