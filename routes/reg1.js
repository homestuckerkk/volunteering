const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const { check } = require('express-validator');


router.post('/', function (req, res, next) {
    let a = [req.body.name, req.body.email, req.body.phone_number, req.body.date_of_birth, req.body.password, "user"]
    console.log(a);
    model.setRegistrationUser((err) => {
        if(err){
            console.log(err);
        } else {
            if(check("name").notEmpty() && check("name").isString()){
                if(check("email").isEmail()){
                    if(check("phone_number").isMobilePhone()){
                        if(check("date_of_birth").isDate()){
                            if(Number(req.body.password) != 0 && req.body.password.length >= 8){
                                res.redirect("/auto")
                            }else{
                                alert("Неверно введённые данные")
                            }
                        }else{
                            alert("Неверно введённые данные")
                        }
                    }else{
                        alert("Неверно введённые данные")
                    }
                }else{
                    alert("Неверно введённые данные")
                }
            }else{
                alert("Неверно введённые данные")
            }
        };
    },a)
})

module.exports = router;