const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const { spawnSync } = require('child_process');
var messag1 = "Неверно введены данные. Пароль должен состоять минимум из 8 символов."
var messag2 = "Неверно введены данные. Дата рождения должна быть написана в формате '01.01.01'"
var messag3 = "Неверно введены данные. Телефонный номер состоит только из цифр и должен записани формате '80000000000'"
var messag4 = "Неверно введены данные. Проверьте правильность написания почты"
var messag5 = "Неверно введены данные. Имя пользователя состоит только из букв"


router.post('/', function (req, res, next) {
    if (check(req.body.name).notEmpty() && check(req.body.name).isString()) {
        if (check(req.body.email).isEmail()) {
            if (check(req.body.phone_number).isMobilePhone()) {
                if (check(req.body.date_of_birth).isDate()) {
                    if (req.body.password.length >= 8 && req.body.password == req.body.password1) {
                        let a = [req.body.name, req.body.email, req.body.phone_number, req.body.date_of_birth, req.body.password, "user"]
                        console.log(a);
                        model.setRegistrationUser((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/auto");
                            };
                        }, a)
                    } else {
                        spawnSync("powershell.exe", [`
            Add-Type -AssemblyName PresentationCore,PresentationFramework;
            [System.Windows.MessageBox]::Show('${messag1}');
            `]);
                    }
                } else {
                    spawnSync("powershell.exe", [`
            Add-Type -AssemblyName PresentationCore,PresentationFramework;
            [System.Windows.MessageBox]::Show('${messag2}');
            `]);
                }
            } else {
                spawnSync("powershell.exe", [`
            Add-Type -AssemblyName PresentationCore,PresentationFramework;
            [System.Windows.MessageBox]::Show('${messag3}');
            `]);
            }
        } else {
            spawnSync("powershell.exe", [`
            Add-Type -AssemblyName PresentationCore,PresentationFramework;
            [System.Windows.MessageBox]::Show('${messag4}');
            `]);
        }
    } else {
        spawnSync("powershell.exe", [`
            Add-Type -AssemblyName PresentationCore,PresentationFramework;
            [System.Windows.MessageBox]::Show('${messag5}');
            `]);
    }
})

module.exports = router;