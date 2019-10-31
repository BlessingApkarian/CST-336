// JavaScript File
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jakeRouter  = require('./routes/ourApp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', jakeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// Solution:
// $.ajax({
//     type: "post",
//     url: "/exercises/routing/add", // Need /add as parameter
//     dataType: "json",
//     data: {
//         "timestamp": (new Date()).getMilliseconds(),
//         "username": "JimmyD1978",
//         "messages": ['this is a test message', 'another one']
//     },
//     success: function(data, status) {
//         console.log('good data back', data)
//     },
//     error: function(xhr, status, description) {
//         console.log('no good', description);
//     },
//     complete: function(data, status) { 
//         console.log('called no matter what');
//     }
// });