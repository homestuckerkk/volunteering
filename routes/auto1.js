const model = require(`../model/model`);
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { spawnSync } = require('child_process');
const messag = "Неверно введены данные. Проверьте правильность написания логина и пароля";


router.post('/', function (req, res, next) {
    let data = [req.body.email, req.body.password]
    console.log(data);
    model.checkinLoginData((err, rows) => {
        if (err) {
            spawnSync("powershell.exe", [`
            Add-Type -AssemblyName PresentationCore,PresentationFramework;
            [System.Windows.MessageBox]::Show('${messag}');
            `]);
            console.log(err);
            res.redirect('/auto');
        } else {
            console.log(rows);
            if (rows[1] == "user") {
                token = jwt.sign({ id: rows[0]["id"], email: rows[0]["email"], name: rows[0]["name"], password: rows[0]["password"], image_user: rows[0]["image_user"], role: "user" }, "789567", { expiresIn: "1000h" });
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.redirect('/personal_area_user');
            } else {
                token = jwt.sign({ id: rows[0]["id"], email: rows[0]["email"], name: rows[0]["name_of_company"], password: rows[0]["password"], image_company: rows[0]["image_company"], role: "company" }, "789567", { expiresIn: "1000h" });
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.redirect('/personal_area_company');
            }
        };
    }, data)
})



module.exports = router;