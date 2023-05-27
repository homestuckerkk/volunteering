var express = require('express');
var router = express.Router();
const model = require(`../model/model`);

router.get('/', function(req, res, next) {
  
  var data = [req.cookies.data.district, req.cookies.data.type]

  model.getInfoActivityForSearch((err, rows) => {
    if (err) {
      console.log(err);
    } else {
      let data = {rows : rows}
      res.render('homechosen', data);
    };
  }, data)
});

module.exports = router;