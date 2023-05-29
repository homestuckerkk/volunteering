var express = require('express');
var router = express.Router();
const model = require(`../model/model`);

router.get('/', function (req, res, next) {
  model.getInfoActivityForHome((err, rows) => {
    if (err) {
      console.log(err);
    } else {
      let data = { rows: rows }
      res.render('home', data);
    };
  })
});

module.exports = router;