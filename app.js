var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var sequelize = require('./models/index'); 
var admin = require('./models/admin');
var data = require('./models/data');
var pengguna = require('./models/pengguna');
var makanan = require('./models/makanan');
var rumah_adat = require('./models/rumah_adat');
var pariwisata = require('./models/pariwisata');
var budaya = require('./models/budaya');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('./admin',adminRouter);

sequelize.sync()
 .then(() => {
 console.log('Database synchronized');
 })
 .catch(err => {
 console.error('Error synchronizing database:', err);
 });
module.exports = app;
