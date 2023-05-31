const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
var messag1 = "Неверно введены данные. Пароль должен состоять минимум из 8 символов."
var messag2 = "Неверно введены данные."
var messag3 = "Неверно введены данные. Имя учередителя должно состоять только из букв"
var messag4 = "Неверно введены данные. Проверьте правильность написания почты"
var messag5 = "Неверно введены данные. Название компании состоит только из букв"

router.post('/', function (req, res, next) {
    if (check(req.body.name_of_company).notEmpty() && check(req.body.name_of_company).isString()) {
        if (check(req.body.email).isEmail()) {
            if (check(req.body.name_of_creator).notEmpty() && check(req.body.name_of_creator).isString()) {
                if (check(req.body.type).notEmpty()) {
                    if (req.body.password.length >= 8 && req.body.password == req.body.password1) {
                        let a = [req.body.name_of_company, req.body.name_of_creator, req.body.email, req.body.type, req.body.password, req.body.file, "company"]
                        console.log(a);
                        model.setRegistrationCompany((err) => {
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