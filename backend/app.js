var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var swig  = require('swig');

// var routes = require('./routes/index');
var kevinmockdata = require('./routes/kevinmockdata');
var kevinwapmock = require('./routes/kevinwapmock');
// var helpermockdata = require('./routes/helpermockdata');
//var rongmockdata = require('./routes/rongmockdata');
// var users = require('./routes/users');
// var erpdata = require('./routes/erpmock');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// This is where all the magic happens! 
// app.engine('html', swig.renderFile);
// app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false); 

// To disable Swig's cache, do the following:
// swig.setDefaults({ cache: false });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.use('/', kevinwapmock);
app.use('/mock', kevinmockdata);
//app.use('/butler-article', rongmockdata);
// app.use('/help', helpermockdata);
// app.use('/erpmock', erpdata);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var youXu = function(arr){
  if(arr.length<=1){
    return arr;
  }

  var middleIndex = Math.floor(arr.length/2);
  var left=[];
  var right=[];
  var middlePrice=arr.splice(middleIndex,1)[0];
  for(var i= 0; i< arr.length; i++){
      if(arr[i] < middlePrice){
        left.push(arr[i]);
      }else{
        right.push(arr[i]);
      }
  }
   return youXu(left).concat([middlePrice],youXu(right));
}



 var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
module.exports = app;
