var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
    if (req.cookies.token != 'undefined') {
        var token = req.cookies.token;
        var decoded_token = jwt.verify(token, "789567");
        if (decoded_token['role'] = 'user'){
            let data = { role: decoded_token["role"] }
            res.render('usernamechange', data);
        } else { 
            res.redirect('/');
        }
    } else {
        res.redirect('/')
    }

});

module.exports = router;