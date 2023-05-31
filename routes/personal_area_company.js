var express = require('express');
const model = require(`../model/model`);
var router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
  if (req.cookies.token != undefined){
    var token = req.cookies.token;
    var decoded_token = jwt.verify(token, "789567");
    if (decoded_token["role"] == "company"){
      model.getInfoActivity((err, rowss) => {
        if (err) {
          console.log(err);
          res.redirect('/auto');
        } else {
          model.getImageCompany((err, rows) => {
            if (err) {
              console.log(err);
              res.redirect('/auto');
            } else {
              console.log(rows);
              let data = { name: decoded_token["name"], email: decoded_token["email"], image_company: rows[0]["image_company"], rows: rowss, role: decoded_token["role"] }
              console.log(data)
              res.render('personal_area_company', data);
            }
          }, decoded_token.id)
        };
      }, decoded_token.id)
    } else if (decoded_token["role"] == "user") {
      res.redirect('/personal_area_user')
    } else {
      res.redirect('/auto')
    }
  }else {
    res.redirect('/auto')
  }
    
})

module.exports = router;