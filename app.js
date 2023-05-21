var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { create } = require('express-handlebars');


var home = require("./routes/home");
var reg = require("./routes/reg");
var regcomp = require("./routes/regcomp")
var auto = require("./routes/auto")
var personal_area_company = require("./routes/personal_area_company")
var personal_area_user = require("./routes/personal_area_user")
var personal_area = require("./routes/personal_area")
var form = require("./routes/form")
var reg1 = require("./routes/reg1")
var regcomp1 = require("./routes/regcomp1")
var form1 = require("./routes/form1")
var auto1 = require("./routes/auto1")

var app = express();
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/reg', reg);
app.use('/regcomp', regcomp);
app.use("/auto", auto);
app.use("/personal_area_company", personal_area_company);
app.use("/personal_area_user", personal_area_user);
app.use("/personal_area", personal_area);
app.use("/form", form);
app.use("/registering", reg1);
app.use("/regcompany", regcomp1);
app.use("/activity", form1);
app.use("/loging", auto1)


app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
