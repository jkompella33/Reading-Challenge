var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongo = require('mongodb');
var mongoose = require('mongoose');
var monk = require('monk');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://a2fRC:acts24247@ds139067.mlab.com:39067/heroku_f8dn17g6';


var index = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var register = require('./routes/register');
var books = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
	MongoClient.connect(url, (err, db) => {  
  		if (err) {
		    return console.log(err);
	  	}
 		req.db = db;
 	});
	next();
});

app.use('/', index);
app.use('/users', users);
app.use('/home', home);
app.use('/register', register);
app.use('/books',books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
