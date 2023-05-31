var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const model = require(`../model/model`);
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.cookies.token != undefined) {
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    if (decoded_token["role"] == "user") {
      model.getImageUser((err, rows) => {
        if (err) {
          console.log(err);
          res.redirect('/auto');
        } else {
          model.getActivityUser((err, rowss) => {
            if (err) {
              console.log(err);
              res.redirect('/auto');
            } else {
              console.log(rows);
              let data = { name: decoded_token["name"], email: decoded_token["email"], image_user: rows[0]["image_user"], role: decoded_token["role"], rows: rowss }
              res.render('personal_area_user', data);
            }
          }, decoded_token.id)
        }
      }, decoded_token.id)
    } else if (decoded_token["role"] == "company") {
      res.redirect('/personal_area_company')
    } else {
      res.redirect('/auto')
    }
  } else {
    res.redirect('/auto')
  }


});

module.exports = router;